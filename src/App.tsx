import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import { todolistReducer, TodolistReducerType } from "./reducer/todolistReducer";
import { taskReducer } from "./reducer/taskReducer";
import { Todolist } from "./component/Todolist";

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
	
	const removeTask = () => {
		taskDispatch()
	}
	
	
	return (
		
		<div>
			{
				todolists.map( el => {
					return <Todolist
						key={ el.id }
						todolistID={ el.id }
						title={ el.title }
						tasks={tasks[el.id]}
					/>
				} )
			}
		</div>
	);
};