import { FilterValueType } from "../App";
import { Dispatch } from "redux";
import { todoListAPI, TodoListType } from "../component/api/api";

const initialState: TodoListsAppType[] = []


export const todolistReducer = ( state: TodoListsAppType[] = initialState, action: ActionType ): TodoListsAppType[] => {
	switch ( action.type ) {
		case 'NEW-FILTER-VALUE': {
			return state.map( el => el.id === action.payload.todolistID
				? { ...el, filter: action.payload.newFilter }
				: el )
		}
		case "REMOVE-TODOLIST": {
			return state.filter( s => s.id !== action.payload.todolistID )
		}
		case "ADD-NEW-TODO-LIST": {
			return [
				{ ...action.payload.newTodoList, filter: "all" }, ...state
			]
		}
		case "CHANGE-TODOLIST-TITLE": {
			return state.map( el => el.id === action.payload.todolistID
				?
				{ ...el, title: action.payload.newTitle }
				: el
			)
		}
		case "SET-TODOLIST": {
			return action.payload.todoLists
				.map((el) => ({...el, filter: "all" }))
		}
		default :
			return state
	}
}
// action creators
export const ChangedFilterAC = (todolistID: string, newFilter: FilterValueType) => {
	return {
		type: 'NEW-FILTER-VALUE',
		payload: {
			todolistID,
			newFilter
		}
	} as const
}

export const RemoveTodolistAC = (todolistID: string) => {
	return {
		type: "REMOVE-TODOLIST",
		payload: {
			todolistID
		}
	} as const
}

export const AddNewTodolistAC = (newTodoList: TodoListType) => {
	return {
		type: 'ADD-NEW-TODO-LIST',
		payload: {
			newTodoList
		}
	} as const
}
export const ChangeTodolistTitleAC = ( todolistID: string, newTitle: string ) => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		payload: {
			todolistID,
			newTitle
		}
	} as const
}

export const setTodoListAC = ( todoLists: TodoListType[] ) => {
	return {
		type: "SET-TODOLIST",
		payload: { todoLists }
	} as const
}

//thunks
export const setTodoListTC = () => ( dispatch: Dispatch ) => {
	todoListAPI.getTodoLists()
		.then( ( res ) => dispatch(setTodoListAC( res.data ) ))
}
export const addNewTodoListTC = (todoListTitle: string) => ( dispatch: Dispatch ) => {
	todoListAPI.createTodoList(todoListTitle)
		.then( ( res ) => dispatch(AddNewTodolistAC( res.data.data.item ) ))
}

export const removeTodoListTC = (todoListID: string) => ( dispatch: Dispatch ) => {
	todoListAPI.removeTodoList(todoListID)
		.then( ( res ) => dispatch(RemoveTodolistAC( todoListID ) ))
}

export const changeTodoListTC = (todoListID: string, newTodoListTitle: string) => ( dispatch: Dispatch ) => {
	todoListAPI.updateTodoList(todoListID, newTodoListTitle)
		.then( ( res ) => dispatch(ChangeTodolistTitleAC( todoListID, newTodoListTitle ) ))
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
	| ReturnType<typeof ChangedFilterAC>
	| ReturnType<typeof RemoveTodolistAC>
	| ReturnType<typeof AddNewTodolistAC>
	| ReturnType<typeof ChangeTodolistTitleAC>
	| ReturnType<typeof setTodoListAC>