import React, { JSX, useEffect, useReducer } from 'react';
import { v1 } from 'uuid';
import {
	AddNewTodolistAC,
	ChangedFilterAC,
	ChangeTodolistTitleAC,
	RemoveTodolistAC, setTodoListTC,
	todolistReducer, TodoListsAppType
} from "./reducer/todolistReducer";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	RemoveTasksObjAC,
	taskReducer, TaskStateType
} from "./reducer/taskReducer";
import { Todolist } from "./component/todolist/Todolist";
import './App.css'
import { UniversalInputField } from "./component/UniversalInput/UniversalInputField";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./reducer/store";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { Header } from "./component/header/Header";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App  = () => {
	
	const todoLists = useSelector<AppRootStateType, TodoListsAppType[]>( state => state.todoLists )
	const tasks = useSelector<AppRootStateType, TaskStateType>( state => state.tasks )
	const dispatch = useAppDispatch()
	
	useEffect(()=> {
		dispatch(setTodoListTC())
	},[])
	
	const removeTask = ( taskID: string, todolistID: string ) => {
		// taskDispatch( RemoveTaskAC( todolistID, taskID ) )
	}
	
	const addTask = ( todolistID: string, title: string ) => {
		dispatch( AddTaskAC( todolistID, title ) )
	}
	const onChangeTaskStatus = ( todolistID: string, taskID: string, newIsDone: boolean ) => {
		// taskDispatch( ChangeTaskStatusAC( todolistID, taskID, newIsDone ) )
		}
		const changedFilter = ( todolistID: string, newFilter: FilterValueType ) => {
			// todoListsDispatch( ChangedFilterAC( todolistID, newFilter ) )
		}
		const removeTodolist = ( todolistID: string ) => {
			// todoListsDispatch( RemoveTodolistAC( todolistID ) )
			// taskDispatch( RemoveTasksObjAC( todolistID ) )
		}
		const addNewTodolist = ( newTodolistTitle: string ) => {
			// const todolistID = v1()
			// todoListsDispatch( AddNewTodolistAC( newTodolistTitle, todolistID ) )
			// taskDispatch( AddNewTodolistAC( newTodolistTitle, todolistID ) )
		}
		const changedTaskText = ( todolistId: string, taskID: string, newTitle: string ) => {
			// taskDispatch( ChangeTaskTitleAC( todolistId, taskID, newTitle ) )
		}
		const changedTodolistTitle = ( todolistID: string, newTitle: string ) => {
			// todoListsDispatch( ChangeTodolistTitleAC( todolistID, newTitle ) )
		}
		
		return (
			<>
				<Header/>
				<div>
					<UniversalInputField callBack={ addNewTodolist }/>
				</div>
			<div className={ 'app' }>
				
				{
					todoLists.map( el => {
						
						let taskForTodolist = tasks[ el.id ]
						el.filter === 'active' ? taskForTodolist = taskForTodolist.filter( el => !el.isDone )
							: el.filter === 'completed' ? taskForTodolist = taskForTodolist.filter( el => el.isDone )
								: 'all' // logic for filter
						
						return <Todolist
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
					} )
				}
			</div>
			</>
		);
	};
