import { assert, describe, it } from "vitest";
import {
	todolistReducer,
	changedFilterAC,
	removeTodolistAC,
	addNewTodolistAC,
	changeTodolistTitleAC,
	setTodoListAC,
	TodoListsAppType,
} from "../src/reducer/todolistReducer";


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
		
		const action = changedFilterAC("1", "completed");
		const newState = todolistReducer(initialState, action);
		
		assert.deepEqual(newState[0].filter, "completed");
		assert.deepEqual(newState[1].filter, "all") ;
	});
	
	it("REMOVE-TODOLIST action", () => {
		const action = removeTodolistAC("1");
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
		
		const action = addNewTodolistAC(newTodoList);
		const newState = todolistReducer(initialState, action);
		
		assert.equal (newState.length, 3);
		assert.equal(newState[0].id, "3");
		assert.equal(newState[0].title, "TodoList 3");
	});
	
	it("CHANGE-TODOLIST-TITLE action", () => {
		const action = changeTodolistTitleAC("1", "New Title");
		const newState = todolistReducer(initialState, action);
		assert.equal(newState[0].title, "New Title");
	});
	
	test("SET-TODOLIST action", () => {
		const todoLists = [
			{
				id: "4",
				addedDate: new Date(),
				order: 3,
				title: "TodoList 4",
				filter: "all",
			},
		];
		const action = setTodoListAC(todoLists);
		const newState = todolistReducer(initialState, action);
		assert.equal(newState.length, 1);
		assert.equal(newState[0].id, "4");
		assert.equal(newState[0].title, "TodoList 4");
	});
});

