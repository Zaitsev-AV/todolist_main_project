import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import {
	AddNewTodolistAC,
	ChangedFilterAC,
	ChangeTodolistTitleAC,
	RemoveTodolistAC,
	todolistReducer
} from "./reducer/todolistReducer";
import {
	AddTaskAC,
	ChangeTaskStatusAC,
	ChangeTaskTitleAC,
	RemoveTaskAC,
	RemoveTasksObjAC,
	taskReducer
} from "./reducer/taskReducer";
import { Todolist } from "./component/todolist/Todolist";
import './App.css'
import { UniversalInputField } from "./component/UniversalInput/UniversalInputField";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App: React.FC = ( props ) => {
	
	let todolistID1 = v1();
	let todolistID2 = v1();
	
	const [ todolists, todolistsDispatch ] = useReducer( todolistReducer, [
		{ id: todolistID1, title: "What to learn", filter: "all" },
		{ id: todolistID2, title: "What to buy", filter: "all" }
	] )
	
	const [ tasks, taskDispatch ] = useReducer( taskReducer, {
		[ todolistID1 ]: [
			{ id: v1(), title: "HTML&CSS", isDone: true },
			{ id: v1(), title: "JS", isDone: true }
		],
		[ todolistID2 ]: [
			{ id: v1(), title: "Milk", isDone: true },
			{ id: v1(), title: "React Book", isDone: true }
		]
	} );
	
	const removeTask = ( taskID: string, todolistID: string ) => {
		taskDispatch( RemoveTaskAC( todolistID, taskID ) )
	}
	
	const addTask = ( todolistID: string, title: string ) => {
		taskDispatch( AddTaskAC( todolistID, title ) )
	}
	const onChangeTaskStatus = ( todolistID: string, taskID: string, newIsDone: boolean ) => {
		taskDispatch( ChangeTaskStatusAC( todolistID, taskID, newIsDone ) )
	}
	const changedFilter = ( todolistID: string, newFilter: FilterValueType ) => {
		todolistsDispatch( ChangedFilterAC( todolistID, newFilter ) )
	}
	const removeTodolist = ( todolistID: string ) => {
		todolistsDispatch( RemoveTodolistAC( todolistID ) )
		taskDispatch( RemoveTasksObjAC( todolistID ) )
	}
	const addNewTodolist = ( newTodolistTitle: string ) => {
		const todolistID = v1()
		todolistsDispatch( AddNewTodolistAC( newTodolistTitle, todolistID ) )
		taskDispatch( AddNewTodolistAC( newTodolistTitle, todolistID ) )
	}
	const changedTaskText = ( todolistId: string, taskID: string, newTitle: string ) => {
		taskDispatch( ChangeTaskTitleAC( todolistId, taskID, newTitle ) )
	}
	const changedTodolistTitle = ( todolistID: string, newTitle: string ) => {
		todolistsDispatch( ChangeTodolistTitleAC( todolistID, newTitle ) )
	}
	
	return (
		<div className={ 'app' }>
			<UniversalInputField callBack={ addNewTodolist }/>
			{
				todolists.map( el => {
					
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
	);
};