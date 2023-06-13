import axios from "axios";

export const instance = axios.create( {
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': '8f2534e2-22a4-4052-894e-a66c04807482'
	}
} )

//types



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



export type UpDateTodolistArgType = {
	todolistID: string
	title: string
}