import { assert, describe, it } from "vitest";
import {
	changedFilterAC,
	todolistReducer,
	TodoListsAppType, todolistThunks
} from "src/feauters/TodolistList/Todolist/todolistReducer";



describe("todolistReducer", () => {
	const initialState: TodoListsAppType[] = [
		{
			id: "1",
			addedDate: new Date(),
			order: 0,
			title: "TodoList 1",
			filter: "all",
		},
		{
			id: "2",
			addedDate: new Date(),
			order: 1,
			title: "TodoList 2",
			filter: "all",
		},
	];
	
	it("NEW-FILTER-VALUE action", () => {
		
		const action = changedFilterAC( { todolistID: "1",newFilter: "completed" });
		const newState = todolistReducer(initialState, action);
		
		assert.deepEqual(newState[0].filter, "completed");
		assert.deepEqual(newState[1].filter, "all") ;
	});
	
	it("REMOVE-TODOLIST action", () => {
		const action = todolistThunks.removeTodolist.fulfilled( {todolistID: "1" }, '', {todolistID: "1"});
		const newState = todolistReducer(initialState, action);
		assert.equal(newState.length, 1);
		assert.equal(newState[0].id, "2");
	});
	
	it("ADD-NEW-TODO-LIST action", () => {
		const newTodoList: TodoListsAppType = {
			id: "3",
			addedDate: new Date(),
			order: 2,
			title: "TodoList 3",
			filter: "all",
		};
		
		const action = todolistThunks.addNewTodolist.fulfilled(
			{ newTodoList },
			'',
			{ todoListTitle: "TodoList 3" } );
		const newState = todolistReducer( initialState, action );
		
		assert.equal (newState.length, 3);
		assert.equal(newState[0].id, "3");
		assert.equal(newState[0].title, "TodoList 3");
	});
	
	it("CHANGE-TODOLIST-TITLE action", () => {
		const arg = {todolistID: "1",title: "New Title" }
		const action = todolistThunks.changeTodolist.fulfilled( arg, '', arg);
		const newState = todolistReducer(initialState, action);
		assert.equal(newState[0].title, "New Title");
	});
	
	test("SET-TODOLIST action", () => {
		const todolists = [
			{
				id: "4",
				addedDate: new Date(),
				order: 3,
				title: "TodoList 4",
				filter: "all",
			},
		];
		const action = todolistThunks.setTodolist.fulfilled( { todolists }, '' );
		const newState = todolistReducer( initialState, action );
		assert.equal(newState.length, 1);
		assert.equal(newState[0].id, "4");
		assert.equal(newState[0].title, "TodoList 4");
	});
});

