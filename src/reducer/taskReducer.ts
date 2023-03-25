import { v1 } from "uuid";
import { FilterValueType } from "../App";

export type taskReducerType = {
	[key: string]: TaskType[]
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
type ActionType = ReturnType<typeof RemoveTaskAC> | ReturnType<typeof AddTaskAC>
	| ReturnType<typeof ChangeTaskStatusAC> | ReturnType<typeof RemoveTasksObjAC>


export const taskReducer = ( state: taskReducerType, action: ActionType ): taskReducerType => {
	switch ( action.type ) {
		case 'REMOVE-TASK': {
			return {
				...state, [ action.payload.todolistID ]:
					state[ action.payload.todolistID ].filter( el => el.id !== action.payload.taskID )
			}
		}
		case 'ADD-TASK' : {
			return {
				...state, [ action.payload.todolistID ]:
					[ { id: v1(), title: action.payload.title, isDone: false },
						...state[ action.payload.todolistID ] ]
			}
		}
		case 'CHANGE-TASK-STATUS': {
			return {
				...state, [ action.payload.todolistID ]:
					state[ action.payload.todolistID ].map( el => el.id === action.payload.taskID
						?
						{ ...el, isDone: action.payload.newIsDone }
						:
						el )
			}
		}
		case "REMOVE-TASKS-OBJ": {
			delete state[action.payload.todolistID] // удаляем из стейта с тасками таски удаленного тудулиста
		}
	}
	return state
}

export const RemoveTaskAC = ( todolistID: string, taskID: string ) => {
	return {
		type: "REMOVE-TASK",
		payload: {
			todolistID,
			taskID
		}
	} as const
}

export const AddTaskAC = ( todolistID: string, title: string ) => {
	return {
		type: 'ADD-TASK',
		payload: {
			todolistID,
			title
		}
	} as const
}

export const ChangeTaskStatusAC = ( todolistID: string, taskID: string, newIsDone: boolean ) => {
	return {
		type: 'CHANGE-TASK-STATUS',
		payload: {
			todolistID,
			taskID,
			newIsDone
		}
	} as const
}
export const RemoveTasksObjAC = (todolistID: string) => {
	return {
		type: 'REMOVE-TASKS-OBJ',
		payload: {
			todolistID
		}
	} as const
}


