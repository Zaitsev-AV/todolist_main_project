import React, { useEffect } from 'react';
import s from './Todolist.module.css'
import { FilterValueType } from "@/app/App";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "@/common/Api/apiProject";
import { tasksThunks } from "@/feauters/TodolistList/Todolist/Task/taskReducer";
import { useAppDispatch } from "@/common/hooks";
import { DeleteBtn, EditableText, UniversalInputField } from "@/common/components";


export type TodolistPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTask: ( taskID: string, todolistID: string ) => void
	addTask: ( todolistID: string, title: string ) => void
	onChangeTaskStatus: ( todolistID: string, taskID: string, status: TaskStatuses ) => void
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
		dispatch(tasksThunks.setTask(todolistID))
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
						<DeleteBtn callback={onClickRemoveTodolist}/>
					</h2>
					<UniversalInputField callBack={ addTaskHandler } type={'task'}/>
					<div className={ s.tasks }>{ tasks.map( t => {
						return (
							<Task
								key={t.id}
								title={ t.title }
								status={t.status}
								todolistID={ todolistID }
								taskID={ t.id }
								removeTask={ removeTask }
								newTaskTitleHandler={ newTaskTitleHandler }
								onChangeTaskStatus={ onChangeTaskStatus }/>
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