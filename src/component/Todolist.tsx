import React, { ChangeEvent } from 'react';
import { TaskType } from "../reducer/taskReducer";
import { UniversalInputField } from "./UniversalInputField";
import s from './Todolist.module.css'
export type TodolistPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTask: (taskID: string, todolistID: string)=> void
	addTask: (todolistID: string, title: string)=> void
	onChangeTaskStatus: (todolistID: string, taskID: string, newIsDone: boolean) => void
};
export const Todolist: React.FC<TodolistPropsType> = ( props ) => {
	const { todolistID, title, tasks, removeTask, addTask, onChangeTaskStatus } = props
	const addTaskHandler = (title: string) => {
		addTask(todolistID, title)
	}

	return (
		<div className={s.card}>
				<h2>{ title }</h2>
				<UniversalInputField callBack={addTaskHandler}/>
				<div className={s.cardTwo}>{ tasks.map( t => {
					const onClickRemoveTask = () => {
						removeTask(t.id, todolistID)
					}
					const onChangeInputStatus = (e: ChangeEvent<HTMLInputElement>) => {
						onChangeTaskStatus(todolistID, t.id, e.currentTarget.checked)
					}
					return (
						<div>
						<span key={ t.id }>{ t.title } <input type={ "checkbox" }
						                                      checked={ t.isDone }
						                                      onChange={onChangeInputStatus}
						/> <button onClick={onClickRemoveTask}>-</button></span>
						</div>
					)
				} ) }</div>
			</div>
			
	);
};