import { FilterValueType } from "../App";
import { v1 } from "uuid";

export type TodolistReducerType = {
    id: string
	title: string
	filter: FilterValueType
}


export const todolistReducer = (state: TodolistReducerType[], action: ActionType): TodolistReducerType[] => {
	switch ( action.type )	{
		case 'NEW-FILTER-VALUE': {
			return state.map(el => el.id === action.payload.todolistID
				? {...el, filter: action.payload.newFilter}
				: el)
		}
		case "REMOVE-TODOLIST": {
			return state.filter(s => s.id !== action.payload.todolistID)
		}
		case "ADD-NEW-TODO-LIST": {
			return [{ id: action.payload.todolistID, title: action.payload.title, filter: "all" },...state]
		}
		case "CHANGE-TODOLIST-TITLE": {
			return state.map(el => el.id === action.payload.todolistID
				?
				{...el, title: action.payload.newTitle}
				: el
			)
		}
		default :
			return state
	}
}

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

export const AddNewTodolistAC = (title: string, todolistID: string) => {
	return {
		type: 'ADD-NEW-TODO-LIST',
		payload: {
			title,
			todolistID
		}
	} as const
}
export const ChangeTodolistTitleAC = (todolistID: string, newTitle: string) => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		payload: {
			todolistID,
			newTitle
		}
	} as const
}

type ActionType = ReturnType<typeof ChangedFilterAC>
	| ReturnType<typeof RemoveTodolistAC>
| ReturnType<typeof AddNewTodolistAC> | ReturnType<typeof ChangeTodolistTitleAC>