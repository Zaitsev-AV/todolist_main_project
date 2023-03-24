import React, { ChangeEvent } from 'react';
import { TaskType } from "../reducer/taskReducer";
import { UniversalInputField } from "./UniversalInputField";
import s from './Todolist.module.css'
import { FilterValueType } from "../App";

export type TodolistPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTask: ( taskID: string, todolistID: string ) => void
	addTask: ( todolistID: string, title: string ) => void
	onChangeTaskStatus: ( todolistID: string, taskID: string, newIsDone: boolean ) => void
	changedFilter: ( todolistID: string, newFilter: FilterValueType ) => void
};
export const Todolist: React.FC<TodolistPropsType> = ( props ) => {
	const { todolistID, title, tasks, removeTask, addTask, onChangeTaskStatus, changedFilter } = props
	const addTaskHandler = ( title: string ) => addTask( todolistID, title )
	
	const onclickBtnFilterHandler = ( value: FilterValueType ) => {
		changedFilter( todolistID, value ) // фильтрацию сделал одной функцией которую вызывает колбэк в онклике кнопки
		// т.к решил что при дальниешем создании универсальной кнопки проще будет сделать ее тупой
		// + не охота плодить лишние функции обработчики
	}
	
	return (
		<div className={ s.card }>
			<div className={ s.cardInfo }>
				<h2 className={s.title}>{ title }</h2>
				<UniversalInputField callBack={ addTaskHandler }/>
				<div className={s.tasks}>{ tasks.map( t => {
					const onClickRemoveTask = () => {
						removeTask( t.id, todolistID )
					}
					const onChangeInputStatus = (e: ChangeEvent<HTMLInputElement>) => {
						onChangeTaskStatus(todolistID, t.id, e.currentTarget.checked)
					}
					return (
						<div>
						<span key={ t.id }>{ t.title } <input type={ "checkbox" }
						                                      checked={ t.isDone }
						                                      onChange={ onChangeInputStatus }
						/> <button onClick={ onClickRemoveTask }>-</button></span>
						
						</div>
					
					)
				} ) }</div>
				<div className={s.btnFilter}>
					<button onClick={ () => onclickBtnFilterHandler( 'all' ) }>All</button>
					<button onClick={ () => onclickBtnFilterHandler( 'active' ) }>Active</button>
					<button onClick={ () => onclickBtnFilterHandler( 'completed' ) }>Completed</button>
				</div>
				
			</div>
		</div>
		
		
	);
};