import { FilterValueType } from "../App";

export type TodolistReducerType = {
    id: string
	title: string
	filter: FilterValueType
}


export const todolistReducer = (state: TodolistReducerType[], action: any): TodolistReducerType[] => {
	switch ( action.type )	{
		case 'action.type': {
			return state
		}
	}
	return state
}

