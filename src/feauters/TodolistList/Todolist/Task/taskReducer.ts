import { Dispatch } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskAPI, TaskPriorities, TaskStatuses, TaskType, TaskUpdate } from "@/feauters/Api/apiProject";
import { addNewTodolistAC, setTodoListAC } from "../todolistReducer";
import { setLocalAppStatusAC } from "@/app/appReducer";
import { handleServerAppError } from "@/common/utils/handelError";
import { AppRootStateType } from "@/app/store";


const initialState: TaskStateType = {}

const slice = createSlice( {
	name: "tasks",
	initialState: initialState,
	reducers: {
		removeTaskAC: ( state, action: PayloadAction<{ todolistID: string, taskID: string }> ) => {
			const tasks = state[ action.payload.todolistID ]
			const index = tasks.findIndex( el => el.id === action.payload.taskID )
			if ( index > -1 ) tasks.splice( index, 1 )
		},
		addTaskAC: ( state, action: PayloadAction<{ todolistID: string, task: TaskType }> ) => {
			state[ action.payload.todolistID ].unshift( action.payload.task )
		},
		removeTasksObjAC: ( state, action: PayloadAction<{ todolistID: string }> ) => {
			delete state[ action.payload.todolistID ]
		},
		upDateTaskAC: ( state, action: PayloadAction<{
			todolistID: string,
			taskID: string,
			newTask: UpdateTaskModelType
		}> ) => {
			const index = state[ action.payload.todolistID ].findIndex( el => el.id === action.payload.taskID )
			state[ action.payload.todolistID ][ index ] = { ...state[ action.payload.todolistID ][ index ], ...action.payload.newTask }
		},
		setTasksAC: ( state, action: PayloadAction<{ todoListID: string, tasks: TaskType[] }> ) => {
			state[ action.payload.todoListID ] = action.payload.tasks
		}
		
	},
	extraReducers: builder =>  {
		builder.addCase(setTodoListAC, ( state, action) => {
			action.payload.todoLists.forEach( el => state[ el.id ] = [] )
		})
			.addCase(addNewTodolistAC, (state, action)=> {
			state[action.payload.newTodoList.id] = []
		})
		
		
	}
} )

export const {
	setTasksAC,
	removeTaskAC,
	removeTasksObjAC,
	upDateTaskAC,
	addTaskAC
} = slice.actions

export const taskReducer = slice.reducer
// thunks creators
export const setTaskTC = ( todoListID: string ) => async ( dispatch: Dispatch ) => {
	dispatch(setLocalAppStatusAC( { localAppStatus:"loading" }))
	try {
		const res = await taskAPI.setTask( todoListID )
		dispatch( setTasksAC( { todoListID, tasks: res.data.items } ) )
		dispatch( setLocalAppStatusAC( { localAppStatus: "succeeded" } ) )
	} catch ( e ) {
		    console.warn(e)
	}
}

export const addTaskTC = ( todoListID: string, title: string ) => async ( dispatch: Dispatch ) => {
	dispatch(setLocalAppStatusAC( { localAppStatus:"loading" }))
	try {
		const res = await taskAPI.addTask( todoListID , title)
		if ( res.data.resultCode === 0 ) {
			dispatch( addTaskAC( { todolistID: todoListID, task: res.data.data.item } ) )
			dispatch( setLocalAppStatusAC( { localAppStatus: 'succeeded' } ) )
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
	dispatch( setLocalAppStatusAC( { localAppStatus: "loading" } ) )
	try {
		const res = await taskAPI.removeTask( todolistID, taskID )
		dispatch( removeTaskAC( { todolistID, taskID } ) )
		dispatch( setLocalAppStatusAC( { localAppStatus: 'succeeded' } ) )
	} catch ( error ) {
		// @ts-ignore
		handleServerNetworkError(error, dispatch)
	}
}

export const upDateTaskTC = ( todolistID: string, taskID: string, newTask: UpdateTaskModelType ) => async ( dispatch: Dispatch, getState: () => AppRootStateType ) => {
	// @ts-ignore
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
		dispatch( setLocalAppStatusAC( { localAppStatus: "loading" } ) )
		const res = await taskAPI.updateTask( todolistID, taskID, taskUpDateModel )
		if ( res.data.resultCode === 0 ) {
			dispatch( upDateTaskAC( { todolistID, taskID, newTask: taskUpDateModel } ) )
			dispatch( setLocalAppStatusAC( { localAppStatus: 'succeeded' } ) )
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
