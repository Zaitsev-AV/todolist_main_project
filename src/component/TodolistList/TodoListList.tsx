import React, { useEffect } from 'react';
import { Todolist } from "./Todolist/Todolist";
import {
	addNewTodoListTC,
	changedFilterAC,
	changeTodoListTC,
	removeTodoListTC,
	setTodoListTC,
	TodoListsAppType
} from "../../reducer/todolistReducer";
import { addTaskTC, removeTaskTC, TaskStateType, upDateTaskTC } from "../../reducer/taskReducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { FilterValueType } from "../../App";
import { UniversalInputField } from "../common/UniversalInput/UniversalInputField";
import { TaskStatuses } from "../api/api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { RequestStatusType } from "../../reducer/appReducer";
import { Preloader } from "../common/Preloader/Preloader";
import { Notification } from "../common/Notification/Notification";

export type TodoListListPropsType = {};
export const TodoListList: React.FC<TodoListListPropsType> = ( props ) => {
	const {} = props
	const todoLists = useAppSelector<TodoListsAppType[]>( state => state.todoLists )
	const tasks = useAppSelector<TaskStateType>( state => state.tasks )
	const status = useAppSelector<RequestStatusType>( state => state.app.globalAppStatus )
	const dispatch = useAppDispatch()
	useEffect( () => {
		dispatch( setTodoListTC() )
	}, [] )
	
	const removeTask = ( taskID: string, todolistID: string ) => {
		dispatch( removeTaskTC( todolistID, taskID ) )
	}
	
	const addTask = ( todolistID: string, title: string ) => {
		dispatch( addTaskTC(todolistID, title) )
	}
	const onChangeTaskStatus = ( todolistID: string, taskID: string, status: TaskStatuses ) => {
		dispatch(upDateTaskTC(todolistID, taskID, {status}))
	}
	const changedFilter = ( todolistID: string, newFilter: FilterValueType ) => {
		dispatch( changedFilterAC( todolistID, newFilter ) )
	}
	const removeTodolist = ( todolistID: string ) => {
		dispatch(removeTodoListTC(todolistID))
	}
	const addNewTodolist = ( newTodolistTitle: string ) => {
		dispatch( addNewTodoListTC( newTodolistTitle ) )
	}
	const changedTaskText = ( todolistID: string, taskID: string, newTitle: string ) => {
		dispatch(upDateTaskTC(todolistID, taskID, {title: newTitle}))
	}
	const changedTodolistTitle = ( todoListID: string, newTitle: string ) => {
		dispatch(changeTodoListTC(todoListID, newTitle))
	}
	return (
		
		<div>
			<div>
				<UniversalInputField callBack={ addNewTodolist } type={'todo'}/>
			</div>
			<Notification/>
			<div className={ 'app' }>
				{ status === 'loading' ?( <Preloader/>) :
					<>
					{
						todoLists.map( el => {
							
							let taskForTodolist = tasks[ el.id ]
							el.filter === 'active' ? taskForTodolist = taskForTodolist.filter(
									el => el.status === TaskStatuses.InProgress )
								: el.filter === 'completed' ? taskForTodolist = taskForTodolist.filter(
										el => el.status === TaskStatuses.Completed )
									: 'all' // logic for filter
							
							return (
								<Todolist
									key={ el.id }
									todolistID={ el.id }
									title={ el.title }
									tasks={ taskForTodolist }
									removeTask={ removeTask }
									addTask={ addTask }
									onChangeTaskStatus={ onChangeTaskStatus }
									changedFilter={ changedFilter }
									removeTodolist={ removeTodolist }
									changedTaskText={ changedTaskText }
									changedTodolistTitle={ changedTodolistTitle }
								/>
							)
						} )
					}
					</>
				}
			</div>
		</div>
	);
};