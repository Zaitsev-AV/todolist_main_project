import { AddNewTodolistAC, setTodoListAC } from "./todolistReducer";
import { Dispatch } from "redux";
import { taskAPI, TaskType } from "../component/api/api";

export type TaskStateType = {
	[ key: string ]: TaskType[]
}
const initialState: TaskStateType = {}

type ActionType =
	| ReturnType<typeof RemoveTaskAC>
	| ReturnType<typeof AddTaskAC>
	| ReturnType<typeof ChangeTaskStatusAC>
	| ReturnType<typeof RemoveTasksObjAC>
	| ReturnType<typeof AddNewTodolistAC>
	| ReturnType<typeof ChangeTaskTitleAC>
	| ReturnType<typeof setTodoListAC>
	| ReturnType<typeof setTasksAC>


export const taskReducer = ( state: TaskStateType = initialState, action: ActionType ): TaskStateType => {
	switch ( action.type ) {
		case "SET-TODOLIST": {
			const copy = {...state}
			action.payload.todoLists.forEach( el => copy[ el.id ] = [] )
			return copy
		}
		case "SET-TASK": {
			return {
				...state, [action.payload.todoListID]: action.payload.tasks
			}
		}
		case 'REMOVE-TASK': {
			return {
				...state, [ action.payload.todolistID ]:
					state[ action.payload.todolistID ].filter( el => el.id !== action.payload.taskID )
			}
		}
		case 'ADD-TASK' : {
			return {
				...state, [ action.payload.todolistID ]: [action.payload.task ,...state[action.payload.todolistID]]
				
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
		case "CHANGE-TASK-TITLE": {
			return {
				...state, [ action.payload.todolistID ]:
					state[ action.payload.todolistID ].map( el => el.id === action.payload.taskID
						?
						{ ...el, title: action.payload.newTitle }
						:
						el )
			}
		}
		case "ADD-NEW-TODO-LIST": {
			return { ...state, [ action.payload.newTodoList.id ]: [] } // добавляем в стейт новый массив с ключом который является id нового тудулиста
		}
		case "REMOVE-TASKS-OBJ": {
			delete state[ action.payload.todolistID ] // удаляем из стейта с тасками таски удаленного тудулиста
		}
		
	}
	return state
}
//action creators
export const RemoveTaskAC = ( todolistID: string, taskID: string ) => {
	return {
		type: "REMOVE-TASK",
		payload: {
			todolistID,
			taskID
		}
	} as const
}

export const AddTaskAC = ( todolistID: string, task: TaskType ) => {
	return {
		type: 'ADD-TASK',
		payload: {
			todolistID,
			task
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
export const RemoveTasksObjAC = ( todolistID: string ) => {
	return {
		type: 'REMOVE-TASKS-OBJ',
		payload: {
			todolistID
		}
	} as const
}

export const ChangeTaskTitleAC = ( todolistID: string, taskID: string, newTitle: string ) => {
	return {
		type: 'CHANGE-TASK-TITLE',
		payload: {
			todolistID,
			taskID,
			newTitle
		}
	} as const
}

export const setTasksAC = ( todoListID: string, tasks: TaskType[] ) => {
	return {
		type: "SET-TASK",
		payload: { todoListID, tasks }
	} as const
}
// thunks creators
export const setTaskTC = ( todoListID: string ) => async ( dispatch: Dispatch ) => {
	try {
		const res = await taskAPI.setTask( todoListID )
		dispatch( setTasksAC( todoListID, res.data.items ) )
	} catch ( e ) {
		    console.warn(e)
	}
}

export const addTaskTC = ( todoListID: string, title: string ) => async ( dispatch: Dispatch ) => {
	try {
		const res = await taskAPI.addTask( todoListID , title)
		if ( res.data.resultCode === 0 ) {
			dispatch( AddTaskAC( todoListID, res.data.data.item ) )
		} else {
			//показать ошибку
		}
	} catch ( e ) {
		console.warn(e)
			// это для обработки ошибок не связанных с сервером, т.к сервак возвращает код 200 если запрос прошел
	}
}

export const removeTaskTC = (todolistID:string, taskID: string) => async (dispatch: Dispatch) => {
	try {
		const res = await taskAPI.removeTask(todolistID, taskID)
		// @ts-ignore
		    console.log(res)
		// if ( res.data.resultCode === 1 ) {
		// 	dispatch(RemoveTaskAC(todolistID, taskID))
		// } else {
		// 	    console.log(res.data.data.messages)
		// }
	} catch ( e ) {
	
	}
}

