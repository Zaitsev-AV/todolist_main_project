import axios, { AxiosResponse } from "axios";

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
		return instance.post<ResponseType<{ item: TodoListType }>>( 'todo-lists', { title } )
	},
	removeTodoList( todoListID: string ) {
		return instance.delete<ResponseType>( `todo-lists/${ todoListID }` )
	},
	updateTodoList( todoListID: string, title: string ) {
		return instance.put(`todo-lists/${ todoListID }`, {title})
	}
}

//task api
export const taskAPI = {
	setTask( todoListID: string ) {
		return instance.get<GetTaskResponse<TaskType[ ]>>( `todo-lists/${ todoListID }/tasks` )
	},
	addTask( todoListID: string, title: string ) {
		return instance.post<ResponseType<{item: TaskType}>>( `todo-lists/${ todoListID }/tasks`, { title } )
	},
	removeTask(todolistID: string, taskID: string) {
		return instance.delete<AxiosResponse<ResponseType>>(`/todo-lists/${todolistID}/tasks/${taskID}`)
	}
}

//types

type ResponseType<T = {}> = {
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