import axios, { AxiosResponse } from "axios";
import { UpdateTaskModelType } from "@/feauters/TodolistList/Todolist/Task/taskReducer";

const instance = axios.create( {
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': '8f2534e2-22a4-4052-894e-a66c04807482'
	}
} )

//todolist api
export const todoListAPI = {
	getTodoLists() {
		return instance.get<TodoListType[]>( 'todo-lists' )
	},
	createTodoList( title: string ) {
		return instance.post<ResponseType<{ item: TodoListType }>, AxiosResponse<ResponseType<{ item: TodoListType }>>>( 'todo-lists', { title } )
	},
	removeTodoList( todoListID: string ) {
		return instance.delete<ResponseType>( `todo-lists/${ todoListID }` )
	},
	updateTodoList( arg: UpDateTodolistArgType ) {
		return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${ arg.todolistID }`, {title:arg.title})
	}
}

//task api
export const taskAPI = {
	getTasks( todoListID: string ) {
		return instance.get<GetTaskResponse<TaskType[ ]>>( `todo-lists/${ todoListID }/tasks` )
	},
	addTask( arg: AddTaskRequestType ) {
		return instance.post<ResponseType<{item: TaskType}>>( `todo-lists/${ arg.todoListID }/tasks`, { title: arg.title } )
	},
	removeTask(todolistID: string, taskID: string) {
		return instance.delete<AxiosResponse<ResponseType>>(`/todo-lists/${todolistID}/tasks/${taskID}`)
	},
	updateTask(todolistID: string, taskID: string,task: TaskUpdate ) {
		return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{item: TaskType}>>,TaskUpdate >(`/todo-lists/${todolistID}/tasks/${taskID}`, task)
	}
}

//auth api

export const authAPI = {
	authMe() {
		return instance.get<ResponseType<AuthResponseType>, AxiosResponse<ResponseType<AuthResponseType>>>('auth/me')
	},
	login(payload: LoginRequestType) {
		return instance.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>>('/auth/login', payload)
	},
	logOut() {
		return instance.delete('auth/login')
	}
}

//types

export type LoginRequestType = {
	email: string
	password: string
	rememberMe?: boolean
}


export type AuthResponseType = {
	id: number
	email: string
	login: string
}

export interface TaskUpdate {
	title: string
	description: string
	completed: boolean
	status: TaskStatuses
	priority: TaskPriorities
	startDate: Date
	deadline: Date
}

export type ResponseType<T = {}> = {
	resultCode: number
	messages: string[]
	fieldsErrors: string[]
	data: T
}


export type TodoListType = {
	id: string
	addedDate: Date
	order: number
	title: string
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export enum ResultCode {
	Success = 0,
	Error = 1,
	Captcha = 10,
}

export type TaskType = {
	description: string
	title: string
	completed: boolean
	status: TaskStatuses
	priority: TaskPriorities
	startDate: Date
	deadline: Date
	id: string
	todoListId: string
	order: number
	addedDate: Date
}
type GetTaskResponse <T> = {
	error: null
	items: T
	totalCount: number
}

export type AddTaskRequestType = {
	todoListID: string
	title: string
}

export type UpDateTaskArgType = {
	todolistID: string
	taskID: string
	newTask: UpdateTaskModelType
}

export type UpDateTodolistArgType = {
	todolistID: string
	title: string
}