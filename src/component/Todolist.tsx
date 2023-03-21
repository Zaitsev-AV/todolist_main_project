import React from 'react';
import { TaskType } from "../reducer/taskReducer";
import { UniversalInputField } from "./UniversalInputField";

export type TodolistPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
};
export const Todolist: React.FC<TodolistPropsType> = ( props ) => {
	const { todolistID, title, tasks } = props
	return (
		<div>
			<h2>{ title }</h2>
			<UniversalInputField/>
			<div>{ tasks.map( t => {
				return (
					<div>
						<span key={ t.id }>{ t.title } <input type={ "checkbox" }
						                                      checked={ t.isDone }/></span>
					</div>
				)
			} ) }</div>
		</div>
	);
};