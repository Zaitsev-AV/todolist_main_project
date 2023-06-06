import { AxiosResponse } from "axios";
import { instance, ResponseType, TodoListType, UpDateTodolistArgType } from "@/common/api/commonAPI";

export const todolistAPI = {
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