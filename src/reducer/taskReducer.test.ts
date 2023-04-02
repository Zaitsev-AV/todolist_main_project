import { describe, it } from 'vitest';
import { AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, RemoveTasksObjAC, taskReducer } from "./taskReducer";


describe('TaskReducer testing', () => {
	it('should remove task from correct todolist', () => {
		const startState = {
			todolist1: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
			todolist2: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
		};
		const endState = taskReducer(startState, RemoveTaskAC('todolist1', '1'));
		
		expect(endState.todolist1.length).toBe(1);
		expect(endState.todolist2.length).toBe(2);
		expect(endState.todolist1.every((t) => t.id !== '1')).toBeTruthy();
	});
	
	it('should add task to correct todolist', () => {
		const startState = {
			todolist1: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
			todolist2: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
		};
		
		const endState = taskReducer(startState, AddTaskAC('todolist1', 'new task'));
		
		expect(endState.todolist1.length).toBe(3);
		expect(endState.todolist2.length).toBe(2);
		expect(endState.todolist1[0].title).toBe('new task');
		expect(endState.todolist1[0].isDone).toBeFalsy();
	});
	
	it('should change task status', () => {
		const startState = {
			todolist1: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
			todolist2: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
		};
		
		const endState = taskReducer(startState, ChangeTaskStatusAC('todolist1', '1', true));
		
		expect(endState.todolist1[0].isDone).toBeTruthy();
		expect(endState.todolist2[0].isDone).toBeFalsy();
	});
	
	it('should remove tasks object', () => {
		const startState = {
			todolist1: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
			todolist2: [
				{ id: '1', title: 'first task', isDone: false },
				{ id: '2', title: 'second task', isDone: false },
			],
		};
		
		const endState = taskReducer(startState, RemoveTasksObjAC('todolist1'));
		
		expect(endState.todolist1).toBeUndefined();
		expect(endState.todolist2.length).toBe(2);
	});
});