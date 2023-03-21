import { FilterValueType } from "../App";

export type taskReducerType = {
	[key: string]: TaskType[]
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}


export const taskReducer = (state: taskReducerType, action: any): taskReducerType => {
	switch ( action.type )	{
		case 'action.type': {
			return state
		}
	}
	return state
}


const RemoveTaskAC = (todolistID: string, taskID: string) => {
	return {
		type: "removeTask",
		payload: {
			todolistID,
			taskID
		}
	}
}
