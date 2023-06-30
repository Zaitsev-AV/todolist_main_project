import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { todolistThunks } from "../todolistReducer";
import { setLocalAppStatus } from "@/app/appReducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "@/common/utils";
import { ResultCode, TaskPriorities, TaskStatuses } from "@/common/enums";
import {
	AddTaskRequestType,
	taskAPI,
	TaskType, TaskUpdate,
	UpDateTaskArgType
} from "@/feauters/TodolistList/Todolist/Task";


const initialState: TaskStateType = {}

const slice = createSlice( {
	name: "tasks",
	initialState: initialState,
	reducers: {
		removeTasksObjAC: ( state, action: PayloadAction<{ todolistID: string }> ) => {
			delete state[ action.payload.todolistID ]
		},
	},
	extraReducers: builder => {
		builder
			.addCase( upDateTask.fulfilled, ( state, action ) => {
				const index = state[ action.payload.todolistID ].findIndex( el => el.id === action.payload.taskID )
				state[ action.payload.todolistID ][ index ] = { ...state[ action.payload.todolistID ][ index ], ...action.payload.newTask }
			} )
			.addCase( removeTask.fulfilled, ( state, action ) => {
				const tasks = state[ action.payload.todolistID ]
				const index = tasks.findIndex( el => el.id === action.payload.taskID )
				if ( index > -1 ) tasks.splice( index, 1 )
			} )
			.addCase( addTask.fulfilled, ( state, action ) => {
				state[ action.payload.todoListID ].unshift( action.payload.task )
			} )
			.addCase( setTask.fulfilled, ( state, action ) => {
				state[ action.payload.todoListID ] = action.payload.tasks
			} )
			.addCase( todolistThunks.setTodolist.fulfilled, ( state, action ) => {
				action.payload.todolists.forEach( el => state[ el.id ] = [] )
			} )
			.addCase( todolistThunks.addNewTodolist.fulfilled, ( state, action ) => {
				state[ action.payload.newTodoList.id ] = []
			} )
		
		
	}
} )
export const { 	removeTasksObjAC} = slice.actions

// thunks

const setTask = createAppAsyncThunk<{ todoListID: string, tasks: TaskType[] }, string>
( 'tasks/setTask', async ( todoListID, thunkAPI ) => {
	const { dispatch, rejectWithValue } = thunkAPI
	dispatch( setLocalAppStatus( { localAppStatus: "loading" } ) )
	try {
		const res = await taskAPI.getTasks( todoListID )
		return { todoListID, tasks: res.data.items }
	} catch ( error ) {
		handleServerNetworkError( error, dispatch )
		return rejectWithValue( null )
	} finally {
		dispatch( setLocalAppStatus( { localAppStatus: "succeeded" } ) )
	}
} )

const addTask = createAppAsyncThunk<{ todoListID: string, task: TaskType }, AddTaskRequestType>
( 'tasks/addTask',
	async ( { todoListID, title }, thunkAPI ) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch( setLocalAppStatus( { localAppStatus: "loading" } ) )
			const res = await taskAPI.addTask( { todoListID, title } )
			if ( res.data.resultCode === ResultCode.Success ) {
				return { todoListID: todoListID, task: res.data.data.item }
			} else {
				//показать ошибку
				handleServerAppError( res.data, dispatch )
				return rejectWithValue( '' )
			}
		} catch ( error ) {
			handleServerNetworkError( error, dispatch )
			return rejectWithValue( '' )
			// это для обработки ошибок не связанных с сервером, т.к сервак возвращает код 200 если запрос прошел
		} finally {
			dispatch( setLocalAppStatus( { localAppStatus: 'succeeded' } ) )
		}
	} )

const removeTask = createAppAsyncThunk<{ todolistID: string, taskID: string }, { todolistID: string, taskID: string }>(
	'tasks/removeTask', async ( { todolistID, taskID }, thunkAPI ) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch( setLocalAppStatus( { localAppStatus: "loading" } ) )
			await taskAPI.removeTask( todolistID, taskID )
			dispatch( setLocalAppStatus( { localAppStatus: 'succeeded' } ) )
			return { todolistID, taskID }
		} catch ( error ) {
			handleServerNetworkError( error, dispatch )
			return rejectWithValue( '' )
		}
	} )

const upDateTask = createAppAsyncThunk<UpDateTaskArgType, UpDateTaskArgType>( 'tasks/upDateTask',
	async ( { todolistID, taskID, newTask }, thunkAPI ) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		const task = getState().tasks[ todolistID ].find( el => el.id === taskID )
		if ( !task ) {
			console.warn( 'task not found in the state' )
			return rejectWithValue( '' )
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
			dispatch( setLocalAppStatus( { localAppStatus: "loading" } ) )
			const res = await taskAPI.updateTask( todolistID, taskID, taskUpDateModel )
			if ( res.data.resultCode === ResultCode.Success ) {
				dispatch( setLocalAppStatus( { localAppStatus: 'succeeded' } ) )
				return { newTask: taskUpDateModel, taskID, todolistID }
			} else {
				//показать ошибку
				dispatch( setLocalAppStatus( { localAppStatus: 'failed' } ) )
				handleServerAppError( res.data, dispatch )
				return rejectWithValue( '' )
			}
		} catch ( error ) {
			handleServerNetworkError( error, dispatch )
			return rejectWithValue( '' )
		}
	} )

export const taskReducer = slice.reducer
export const tasksThunks = { setTask, addTask, removeTask, upDateTask }

// types
export type UpdateTaskModelType = { // этот тип нужен, чтобы собирать данные в приложении, только те данные которые нам нужны.
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: Date
	deadline?: Date
}

export type TaskStateType = {
	[ key: string ]: TaskType[]
}
