import { addNewTodolistAC, setTodoListAC } from "./todolistReducer";
import { Dispatch } from "redux";
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, TaskUpdate } from "../component/api/api";
import { AppRootStateType } from "./store";
import { setAppErrorAC, setGlobalAppStatusAC, setLocalAppStatusAC } from "./appReducer";
import { AxiosError } from "axios";
import { handleServerAppError, handleServerNetworkError } from "../component/utils/handelError";


const initialState: TaskStateType = {}

export const taskReducer = ( state: TaskStateType = initialState, action: ActionType ): TaskStateType => {
	switch ( action.type ) {
		case "SET-TODOLIST": {
			const copy = { ...state }
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
		case "UPDATE-TASK":
			return {
				...state, [ action.payload.todolistID ]: state[ action.payload.todolistID ]
					.map( el => el.id === action.payload.taskID
						?
						{...el,...action.payload.newTask}
						:
						el
					)
			}
		case "ADD-NEW-TODO-LIST": {
			return { ...state, [ action.payload.newTodoList.id ]: [] } // добавляем в стейт новый массив с ключом который является id нового тудулиста
		}
		case "REMOVE-TASKS-OBJ": {
			delete state[ action.payload.todolistID ] // удаляем из стейта с тасками таски удаленного тудулиста
			break
		}
	}
	return state
}
//action creators
export const removeTaskAC = ( todolistID: string, taskID: string ) => {
	return {
		type: "REMOVE-TASK",
		payload: {
			todolistID,
			taskID
		}
	} as const
}

export const addTaskAC = ( todolistID: string, task: TaskType ) => {
	return {
		type: 'ADD-TASK',
		payload: {
			todolistID,
			task
		}
	} as const
}
export const removeTasksObjAC = ( todolistID: string ) => {
	return {
		type: 'REMOVE-TASKS-OBJ',
		payload: {
			todolistID
		}
	} as const
}

export const upDateTaskAC = ( todolistID: string, taskID: string, newTask: UpdateTaskModelType ) => {
	return {
		type: 'UPDATE-TASK',
		payload: {
			todolistID,
			taskID,
			newTask
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
	dispatch(setLocalAppStatusAC("loading"))
	try {
		const res = await taskAPI.setTask( todoListID )
		dispatch( setTasksAC( todoListID, res.data.items ) )
		dispatch(setLocalAppStatusAC("succeeded"))
	} catch ( e ) {
		    console.warn(e)
	}
}

export const addTaskTC = ( todoListID: string, title: string ) => async ( dispatch: Dispatch ) => {
	dispatch(setLocalAppStatusAC("loading"))
	try {
		const res = await taskAPI.addTask( todoListID , title)
		if ( res.data.resultCode === 0 ) {
			dispatch( addTaskAC( todoListID, res.data.data.item ) )
			dispatch(setLocalAppStatusAC('succeeded'))
		} else {
			//показать ошибку
			handleServerAppError(res.data, dispatch)
		}
	} catch ( error ) {
		// @ts-ignore
		handleServerNetworkError(error, dispatch)
		// это для обработки ошибок не связанных с сервером, т.к сервак возвращает код 200 если запрос прошел
	}
}

export const removeTaskTC = ( todolistID: string, taskID: string ) => async ( dispatch: Dispatch ) => {
	dispatch(setLocalAppStatusAC("loading"))
	try {
		const res = await taskAPI.removeTask( todolistID, taskID )
			dispatch( removeTaskAC( todolistID, taskID ) )
			dispatch(setLocalAppStatusAC('succeeded'))
	} catch ( error ) {
		// @ts-ignore
		handleServerNetworkError(error, dispatch)
	}
}

export const upDateTaskTC = ( todolistID: string, taskID: string, newTask: UpdateTaskModelType ) => async ( dispatch: Dispatch, getState: () => AppRootStateType ) => {
	const task = getState().tasks[ todolistID ].find( el => el.id === taskID )
	
	if ( !task ) {
		console.warn( 'task not found in the state' )
		return
	}
	//на сервер на нужно в запросе отправлять объект такого типа, поэтому чтобы не собирать все поля по приложению,
	// мы берем их актуальные значения из текущего состояния
	const taskUpDateModel: TaskUpdate = {
		title: task.title,
		description: task.description,
		completed: task.completed,
		status: task.status,
		priority: task.priority,
		startDate: task.startDate,
		deadline: task.deadline,
		...newTask // здесь мы затираем в объекте который отправим на сервер поля которые изменились.
	}
	try {
		dispatch(setLocalAppStatusAC("loading"))
		const res = await taskAPI.updateTask( todolistID, taskID, taskUpDateModel )
		if ( res.data.resultCode === 0 ) {
			dispatch( upDateTaskAC( todolistID, taskID, taskUpDateModel ) )
			dispatch(setLocalAppStatusAC('succeeded'))
		} else {
			//показать ошибку
			handleServerAppError(res.data, dispatch)
		}
	} catch ( error ) {
		// @ts-ignore
		handleServerNetworkError(error, dispatch)
	}
	
}

// types
export type UpdateTaskModelType = { // этот тип нужен, чтобы собирать данные в приложении, только те данные которые нам нужны.
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: Date
	deadline?: Date
}

type ActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof removeTasksObjAC>
	| ReturnType<typeof addNewTodolistAC>
	| ReturnType<typeof setTodoListAC>
	| ReturnType<typeof setTasksAC>
	| ReturnType<typeof upDateTaskAC>

export type TaskStateType = {
	[ key: string ]: TaskType[]
}
