import { FilterValueType } from "../App";
import { Dispatch } from "redux";
import { todoListAPI, TodoListType } from "../component/api/api";
import { setGlobalAppStatusAC } from "./appReducer";
import { handleServerAppError } from "../component/utils/handelError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TodoListsAppType[] = []


const slice = createSlice( {
	name: 'todolist',
	initialState: initialState,
	reducers: {
		changedFilterAC: ( state, action: PayloadAction<{ todolistID: string, newFilter: FilterValueType }> ) => {
			const index = state.findIndex(el => el.id === action.payload.todolistID)
			state[index].filter = action.payload.newFilter
		},
		removeTodolistAC: ( state, action: PayloadAction<{ todolistID: string }> ) => {
			// state.filter( s => s.id !== action.payload.todolistID )
			const index = state.findIndex( el => el.id === action.payload.todolistID )
			if ( index > -1 ) state.splice( index, 1 )
		},
		addNewTodolistAC: ( state, action: PayloadAction<{ newTodoList: TodoListType }> ) => {
			state.push( { ...action.payload.newTodoList, filter: "all" } )
		},
		changeTodolistTitleAC: ( state, action: PayloadAction<{ todolistID: string, newTitle: string }> ) => {
			const index = state.findIndex(el => el.id === action.payload.todolistID)
			state[index].title = action.payload.newTitle
		},
		setTodoListAC: ( state, action: PayloadAction<{ todoLists: TodoListType[] }> ) => {
			return action.payload.todoLists
				.map( ( el ) => ( { ...el, filter: "all" } ) )
		}
	}
} )


// export const _todolistReducer = ( state: TodoListsAppType[] = initialState, action: ActionType ): TodoListsAppType[] => {
// 	switch ( action.type ) {
// 		case 'NEW-FILTER-VALUE': {
// 			return state.map( el => el.id === action.payload.todolistID
// 				? { ...el, filter: action.payload.newFilter }
// 				: el )
// 		}
// 		case "REMOVE-TODOLIST": {
// 			return state.filter( s => s.id !== action.payload.todolistID )
// 		}
// 		case "ADD-NEW-TODO-LIST": {
// 			return [
// 				{ ...action.payload.newTodoList, filter: "all" }, ...state
// 			]
// 		}
// 		case "CHANGE-TODOLIST-TITLE": {
// 			return state.map( el => el.id === action.payload.todolistID
// 				?
// 				{ ...el, title: action.payload.newTitle }
// 				: el
// 			)
// 		}
// 		case "SET-TODOLIST": {
// 			return action.payload.todoLists
// 				.map( ( el ) => ( { ...el, filter: "all" } ) )
// 		}
// 		default :
// 			return state
// 	}
// }
export const todolistReducer = slice.reducer
export const {
	changedFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	addNewTodolistAC,
	setTodoListAC
} = slice.actions
// action creators
// export const changedFilterAC = ( todolistID: string, newFilter: FilterValueType) => {
// 	return {
// 		type: 'NEW-FILTER-VALUE',
// 		payload: {
// 			todolistID,
// 			newFilter
// 		}
// 	} as const
// }
//
// export const removeTodolistAC = ( todolistID: string) => {
// 	return {
// 		type: "REMOVE-TODOLIST",
// 		payload: {
// 			todolistID
// 		}
// 	} as const
// }
//
// export const addNewTodolistAC = ( newTodoList: TodoListType) => {
// 	return {
// 		type: 'ADD-NEW-TODO-LIST',
// 		payload: {
// 			newTodoList
// 		}
// 	} as const
// }
// export const changeTodolistTitleAC = ( todolistID: string, newTitle: string ) => {
// 	return {
// 		type: 'CHANGE-TODOLIST-TITLE',
// 		payload: {
// 			todolistID,
// 			newTitle
// 		}
// 	} as const
// }
//
// export const setTodoListAC = ( todoLists: TodoListType[] ) => {
// 	return {
// 		type: "SET-TODOLIST",
// 		payload: { todoLists }
// 	} as const
// }

//thunks
export const setTodoListTC = () => async ( dispatch: Dispatch ) => {
	dispatch( setGlobalAppStatusAC( { globalAppStatus: 'loading' } ) )
	try {
		const res = await todoListAPI.getTodoLists()
		dispatch( setTodoListAC( { todoLists: res.data } ) )
		dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
	} catch ( e ) {
		console.log( e )
		dispatch( setGlobalAppStatusAC( { globalAppStatus: 'failed' } ) )
	}
}
export const addNewTodoListTC = ( todoListTitle: string ) => async ( dispatch: Dispatch ) => {
	dispatch( setGlobalAppStatusAC( { globalAppStatus: 'loading' } ) )
	try {
		const res = await todoListAPI.createTodoList( todoListTitle )
		if ( res.data.resultCode === 0 ) {
			dispatch( addNewTodolistAC( { newTodoList: res.data.data.item } ) )
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
		} else {
			//показать ошибку
			handleServerAppError( res.data, dispatch )
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'failed' } ) )
		}
	} catch ( error ) {
		// @ts-ignore
		handleServerNetworkError( error, dispatch )
	}

}

export const removeTodoListTC = ( todoListID: string ) => async ( dispatch: Dispatch ) => {
	dispatch( setGlobalAppStatusAC( { globalAppStatus: 'loading' } ) )
	try {
		const res = await todoListAPI.removeTodoList( todoListID )
		if ( res.data.resultCode === 0 ) {
			dispatch( removeTodolistAC( { todolistID: todoListID } ) )
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
		} else {
			handleServerAppError( res.data, dispatch )
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'failed' } ) )
		}
	}  catch ( error ) {
		// @ts-ignore
		handleServerNetworkError( error, dispatch )
	}
}

export const changeTodoListTC = (todoListID: string, newTodoListTitle: string) => async ( dispatch: Dispatch ) => {
	dispatch( setGlobalAppStatusAC( { globalAppStatus: 'loading' } ) )
	try {
		const res = await todoListAPI.updateTodoList(todoListID, newTodoListTitle)
		if ( res.data.resultCode === 0 ) {
			dispatch( changeTodolistTitleAC( { todolistID: todoListID, newTitle: newTodoListTitle } ) )
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
		} else {
			handleServerAppError( res.data, dispatch )
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'failed' } ) )
		}
	} catch ( error ) {
		// @ts-ignore
		handleServerNetworkError( error, dispatch )
	}
}

//types

export type TodoListsAppType = {
	id: string
	addedDate: Date
	order: number
	title: string
	filter: FilterValueType
}

type ActionType =
	| ReturnType<typeof changedFilterAC>
	| ReturnType<typeof removeTodolistAC>
	| ReturnType<typeof addNewTodolistAC>
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof setTodoListAC>