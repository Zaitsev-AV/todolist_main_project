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
			debugger
			return [{ id: action.payload.todolistID, title: action.payload.title, filter: "all" },...state]
		}
		default : Error("I'm not understand this action type")
	}
	return state
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
	debugger
	return {
		type: 'ADD-NEW-TODO-LIST',
		payload: {
			title,
			todolistID
		}
	} as const
}

type ActionType = ReturnType<typeof ChangedFilterAC>
	| ReturnType<typeof RemoveTodolistAC>
| ReturnType<typeof AddNewTodolistAC>