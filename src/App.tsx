import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import { todolistReducer} from "./reducer/todolistReducer";
import { AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, taskReducer } from "./reducer/taskReducer";
import { Todolist } from "./component/Todolist";
import './App.css'

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
	const onChangeTaskStatus = (todolistID: string, taskID: string, newIsDone: boolean) => {
	taskDispatch(ChangeTaskStatusAC(todolistID, taskID, newIsDone))
	}
	
	
	return (
		
		<div className={ 'app' }>
			{
				todolists.map( el => {
					return <Todolist
						key={ el.id }
						todolistID={ el.id }
						title={ el.title }
						tasks={ tasks[ el.id ] }
						removeTask={ removeTask }
						addTask={ addTask }
						onChangeTaskStatus={onChangeTaskStatus}
					/>
				} )
			}
		</div>
	);
};