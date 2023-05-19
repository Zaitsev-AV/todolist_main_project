import React, { ChangeEvent, useEffect } from 'react';
import { setTaskTC } from "../../../reducer/taskReducer";
import { UniversalInputField } from "../../UniversalInput/UniversalInputField";
import s from './Todolist.module.css'
import { FilterValueType } from "../../../App";
import { EditableText } from "../../editableText/EditableText";
import { TaskType } from "../../api/api";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Task } from "./Task/Task";

export type TodolistPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTask: ( taskID: string, todolistID: string ) => void
	addTask: ( todolistID: string, title: string ) => void
	onChangeTaskStatus: ( todolistID: string, taskID: string, newIsDone: boolean ) => void
	changedFilter: ( todolistID: string, newFilter: FilterValueType ) => void
	removeTodolist: ( todolistID: string ) => void
	changedTaskText:(todolistId: string, taskID: string, newTitle: string) => void
	changedTodolistTitle:( todolistID: string, newTitle: string )=> void
};
export const Todolist: React.FC<TodolistPropsType> = ( props ) => {
	const { todolistID, title,
		tasks, removeTask, addTask,
		onChangeTaskStatus, changedFilter,
		removeTodolist, changedTaskText,
		changedTodolistTitle} = props
	
	const dispatch = useAppDispatch()
	useEffect(()=> {
		dispatch(setTaskTC(todolistID))
	}, [])
	const addTaskHandler = ( title: string ) => addTask( todolistID, title )
	
	const onclickBtnFilterHandler = ( value: FilterValueType ) => {
		changedFilter( todolistID, value ) // фильтрацию сделал одной функцией которую вызывает колбэк в онклике кнопки
		// т.к решил что при дальниешем создании универсальной кнопки проще будет сделать ее тупой
		// + не охота плодить лишние функции обработчики
	}
	const onClickRemoveTodolist = () => {
		removeTodolist(todolistID)
	}
	const newTaskTitleHandler = (taskID: string, newTitle: string) => {
		changedTaskText(todolistID, taskID, newTitle )
	}
	const newTodolistTitleHandler = (newTitle: string) => {
		changedTodolistTitle(todolistID, newTitle)
	}
	
	return (
		<div className={ s.wrapper }>
			<div className={ s.card }>
				<div className={ s.cardInfo }>
					<h2 className={ s.title }>
						<EditableText callBack={ ( newTitle: string ) => newTodolistTitleHandler( newTitle ) }
						              title={ title }/>
						<button onClick={ onClickRemoveTodolist }>-</button>
					</h2>
					<UniversalInputField callBack={ addTaskHandler }/>
					<div className={ s.tasks }>{ tasks.map( t => {
						
						// const onClickRemoveTask = () => {
						// 	removeTask( t.id, todolistID )
						// }
						// const onChangeInputStatus = ( e: ChangeEvent<HTMLInputElement>) => {
						// 	onChangeTaskStatus(todolistID, t.id, e.currentTarget.checked)
						// }
						return (
							<Task
								key={t.id}
								title={ t.title }
								todolistID={ todolistID }
								taskID={ t.id }
								removeTask={ removeTask }
								newTaskTitleHandler={ newTaskTitleHandler }
								onChangeTaskStatus={ onChangeTaskStatus }/>
							// <div>
							// 	<EditableText key={ t.id }
							// 	              title={t.title}
							// 	              callBack={( newTitle: string)=> newTaskTitleHandler(t.id, newTitle)}
							// 	/>
							// 	<input type={ "checkbox" }
							// 	       // checked={ t.isDone }
							// 	       onChange={ onChangeInputStatus }
							// 	/> <button onClick={ onClickRemoveTask }>-</button>
							// </div>
						)
					} ) }</div>
					<div className={ s.btnFilter }>
						<button onClick={ () => onclickBtnFilterHandler( 'all' ) }>All</button>
						<button onClick={ () => onclickBtnFilterHandler( 'active' ) }>Active</button>
						<button onClick={ () => onclickBtnFilterHandler( 'completed' ) }>Completed</button>
					</div>
				
				</div>
			</div>
		</div>
		
	);
};