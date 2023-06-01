import { Dispatch } from "redux";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValueType } from "../../../app/App";
import { todoListAPI, TodoListType } from "../../api/api";
import { setGlobalAppStatusAC } from "../../../app/appReducer";
import { handleServerAppError } from "../../../common/utils/handelError";

const initialState: TodoListsAppType[] = []


const slice = createSlice( {
	name: 'todolist',
	initialState: initialState,
	reducers: {
		changedFilterAC: ( state, action: PayloadAction<{ todolistID: string, newFilter: FilterValueType }> ) => {
			const index =  action.payload.todolistID
			// const index = state.findIndex(el => el.id === action.payload.todolistID)
			state.map(el => el.id === index ? el.filter = action.payload.newFilter : el  )
		},
		removeTodolistAC: ( state, action: PayloadAction<{ todolistID: string }> ) => {
			// state.filter( s => s.id !== action.payload.todolistID )
			const index = state.findIndex( el => el.id === action.payload.todolistID )
			if ( index > -1 ) state.splice( index, 1 )
		},
		addNewTodolistAC: ( state, action: PayloadAction<{ newTodoList: TodoListType }> ) => {
			state.unshift( { ...action.payload.newTodoList, filter: "all" } )
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

export const todolistReducer = slice.reducer
export const {
	changedFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	addNewTodolistAC,
	setTodoListAC
} = slice.actions

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