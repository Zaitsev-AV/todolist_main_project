import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValueType } from "@/app/App";
import { setGlobalAppStatusAC } from "@/app/appReducer";
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "@/common/utils";
import { ResultCode } from "@/common/enums";
import { TodoListType, UpDateTodolistArgType } from "@/common/api/commonAPI";
import { todolistAPI } from "@/feauters/TodolistList/todolistsAPI";

const initialState: TodoListsAppType[] = []


const slice = createSlice( {
	name: 'todolist',
	initialState: initialState,
	reducers: {
		changedFilterAC: ( state, action: PayloadAction<{ todolistID: string, newFilter: FilterValueType }> ) => {
			const index = action.payload.todolistID
			// const index = state.findIndex(el => el.id === action.payload.todolistID)
			state.map( el => el.id === index ? el.filter = action.payload.newFilter : el )
		}
	},
	extraReducers: builder => {
		builder
			.addCase( setTodolist.fulfilled, ( state, action ) => {
				return action.payload.todolists
					.map( ( el ) => ( { ...el, filter: "all" } ) )
			} )
			.addCase( addNewTodolist.fulfilled, ( state, action ) => {
				state.unshift( { ...action.payload.newTodoList, filter: "all" } )
			} )
			.addCase( removeTodolist.fulfilled, ( state, action ) => {
				const index = state.findIndex( el => el.id === action.payload.todolistID )
				if ( index > -1 ) state.splice( index, 1 )
			} )
			.addCase(changeTodolist.fulfilled, (state, action)=> {
				const index = state.findIndex( el => el.id === action.payload.todolistID )
				state[ index ].title = action.payload.title
			})
	}
} )

export const todolistReducer = slice.reducer
export const {
	changedFilterAC,
} = slice.actions

//thunks

const setTodolist = createAppAsyncThunk<{ todolists: TodoListType[] }, void>( 'todolist/setTodolist',
	async ( arg, thunkAPI ) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'loading' } ) )
			const res = await todolistAPI.getTodoLists()
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
			return { todolists: res.data }
		} catch ( e ) {
			setGlobalAppStatusAC( { globalAppStatus: 'failed' } )
			return rejectWithValue( '' )
		}
	} )

const addNewTodolist = createAppAsyncThunk<{ newTodoList: TodoListType }, { todoListTitle: string }>(
	'todolist/addNewTodolist', async ( arg, thunkAPI ) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			const res = await todolistAPI.createTodoList( arg.todoListTitle )
			if ( res.data.resultCode === ResultCode.Success ) {
				dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
				return { newTodoList: res.data.data.item }
			} else {
				handleServerAppError( res.data, dispatch )
				return rejectWithValue( '' )
			}
		} catch ( error ) {
			handleServerNetworkError( error, dispatch )
			return rejectWithValue( '' )
		}
	} )

const removeTodolist = createAppAsyncThunk<{ todolistID: string }, { todolistID: string }>( 'todolist/removeTodolist',
	async ( { todolistID }, thunkAPI ) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'loading' } ) )
			const res = await todolistAPI.removeTodoList( todolistID )
			if ( res.data.resultCode === ResultCode.Success ) {
				dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
				return { todolistID }
			} else {
				handleServerAppError( res.data, dispatch )
				return rejectWithValue( '' )
			}
		} catch ( error ) {
			handleServerNetworkError( error, dispatch )
			return rejectWithValue( '' )
		}
	} )

const changeTodolist = createAppAsyncThunk<UpDateTodolistArgType, UpDateTodolistArgType>( 'todolist/changeTodolist',
	 async ( {todolistID, title}, thunkAPI ) => {
	const { dispatch, rejectWithValue } = thunkAPI
		
		try {
			dispatch( setGlobalAppStatusAC( { globalAppStatus: 'loading' } ) )
			const res = await todolistAPI.updateTodoList( { todolistID, title } )
			if ( res.data.resultCode === ResultCode.Success ) {
				dispatch( setGlobalAppStatusAC( { globalAppStatus: 'succeeded' } ) )
				return  { todolistID, title }
			} else {
				handleServerAppError( res.data, dispatch )
				return rejectWithValue('')
			}
		} catch ( error ) {
			handleServerNetworkError( error, dispatch )
			return rejectWithValue('')
		}
} )

export const todolistThunks = { setTodolist, addNewTodolist, removeTodolist, changeTodolist }

//types

export type TodoListsAppType = {
	id: string
	addedDate: Date
	order: number
	title: string
	filter: FilterValueType
}
