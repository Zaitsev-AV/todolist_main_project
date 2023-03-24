import { useReducer } from "react";
import { todolistReducer } from "./todolistReducer";
import { RemoveTaskAC, taskReducer, taskReducerType } from "./taskReducer";
import { v1 } from "uuid";


test( "changed remove task from state", () => {
	
	const todolistID1 = v1();
	const todolistID2 = v1();
	
	const [ todolists, todolistsDispatch ] = useReducer( todolistReducer, [
		{ id: todolistID1, title: "What to learn", filter: "all" },
		{ id: todolistID2, title: "What to buy", filter: "all" }
	] )
	
	const taskID1 = v1()
	const taskID2 = v1()
	const taskID3 = v1()
	const taskID4 = v1()
	
	const startState: taskReducerType = {
		[ todolistID1 ]: [
			{ id: taskID1, title: "HTML&CSS", isDone: true },
			{ id: taskID2, title: "JS", isDone: true }
		],
		[ todolistID2 ]: [
			{ id: taskID3, title: "Milk", isDone: true },
			{ id: taskID4, title: "React Book", isDone: true }
		]
	}
	
	const newState = taskReducer( startState, RemoveTaskAC( todolistID1, taskID2) )
	
	expect(newState[todolistID1].length).toBe( 1 )
	expect(newState[todolistID1][0].id).toBe( taskID1 )
	expect(newState[todolistID1][0].title).toBe( "HTML&CSS" )
	expect(startState[todolistID1].length).toBe( 2 )
} )


