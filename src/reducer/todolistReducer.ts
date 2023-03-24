import { FilterValueType } from "../App";

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

type ActionType = ReturnType<typeof ChangedFilterAC>