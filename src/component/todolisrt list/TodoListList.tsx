import React, { useEffect } from 'react';
import { Todolist } from "../todolist/Todolist";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../reducer/store";
import {
	addNewTodoListTC,
	ChangedFilterAC,
	changeTodoListTC,
	removeTodoListTC,
	setTodoListTC,
	TodoListsAppType
} from "../../reducer/todolistReducer";
import { TaskStateType } from "../../reducer/taskReducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { FilterValueType } from "../../App";
import { UniversalInputField } from "../UniversalInput/UniversalInputField";
import { TaskStatuses } from "../api/api";

export type TodoListListPropsType = {};
export const TodoListList: React.FC<TodoListListPropsType> = ( props ) => {
	const {} = props
	const todoLists = useSelector<AppRootStateType, TodoListsAppType[]>( state => state.todoLists )
	const tasks = useSelector<AppRootStateType, TaskStateType>( state => state.tasks )
	const dispatch = useAppDispatch()
	useEffect( () => {
		dispatch( setTodoListTC() )
	}, [] )
	
	const removeTask = ( taskID: string, todolistID: string ) => {
		// taskDispatch( RemoveTaskAC( todolistID, taskID ) )
	}
	
	const addTask = ( todolistID: string, title: string ) => {
		// dispatch(  )
	}
	const onChangeTaskStatus = ( todolistID: string, taskID: string, newIsDone: boolean ) => {
		// taskDispatch( ChangeTaskStatusAC( todolistID, taskID, newIsDone ) )
	}
	const changedFilter = ( todolistID: string, newFilter: FilterValueType ) => {
		dispatch( ChangedFilterAC( todolistID, newFilter ) )
	}
	const removeTodolist = ( todolistID: string ) => {
		dispatch(removeTodoListTC(todolistID))
	}
	const addNewTodolist = ( newTodolistTitle: string ) => {
		dispatch( addNewTodoListTC( newTodolistTitle ) )
	}
	const changedTaskText = ( todolistId: string, taskID: string, newTitle: string ) => {
		// taskDispatch( ChangeTaskTitleAC( todolistId, taskID, newTitle ) )
	}
	const changedTodolistTitle = ( todoListID: string, newTitle: string ) => {
		dispatch(changeTodoListTC(todoListID, newTitle))
	}
	debugger
	return (
		<div>
			<div>
				<UniversalInputField callBack={ addNewTodolist }/>
			</div>
			<div className={ 'app' }>
				
				{
					
					todoLists.map( el => {
						
						let taskForTodolist = tasks[ el.id ]
						el.filter === 'active' ? taskForTodolist = taskForTodolist.filter( el => el.status === TaskStatuses.InProgress )
							: el.filter === 'completed' ? taskForTodolist = taskForTodolist.filter( el => el.status === TaskStatuses.Completed )
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
			</div>
		</div>
	);
};