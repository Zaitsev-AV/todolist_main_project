import { describe, it } from 'vitest';
import { addTaskAC, removeTaskAC, removeTasksObjAC, taskReducer, TaskStateType, upDateTaskAC } from "./taskReducer";
import { TaskPriorities, TaskStatuses, TaskType } from "../../../api/api";



describe('TaskReducer testing', () => {
	const startState: TaskStateType = {
		'todolist1': [
			{
				id: '1',
				title: 'first task',
				addedDate: new Date(),
				startDate: new Date(),
				completed: false,
				deadline: new Date(),
				order: 1, description: '',
				priority: TaskPriorities.Low,
				status: TaskStatuses.New, todoListId: 'todolist1'
			},
			{
				id: '2',
				title: 'second task',
				addedDate: new Date(),
				startDate: new Date(),
				completed: false,
				deadline: new Date(),
				order: 1, description: '',
				priority: TaskPriorities.Low,
				status: TaskStatuses.New, todoListId: 'todolist1'
			},
		],
		'todolist2': [
			{
				id: '3',
				title: 'three task',
				addedDate: new Date(),
				startDate: new Date(),
				completed: false,
				deadline: new Date(),
				order: 1, description: '',
				priority: TaskPriorities.Low,
				status: TaskStatuses.New, todoListId: 'todolist2'
			},
			{
				id: '4',
				title: 'four task',
				addedDate: new Date(),
				startDate: new Date(),
				completed: false,
				deadline: new Date(),
				order: 1, description: '',
				priority: TaskPriorities.Low,
				status: TaskStatuses.New, todoListId: 'todolist2'
			},
		],
	};
	it('should remove task from correct todolist', () => {

		const endState = taskReducer( startState, removeTaskAC( { todolistID: 'todolist1', taskID: '1' } ) );
		
		expect(endState.todolist1.length).toBe(1);
		expect(endState.todolist2.length).toBe(2);
		expect(endState.todolist1.every((t) => t.id !== '1')).toBeTruthy();
	});
	
	it('should add task to correct todolist', () => {
		const task: TaskType = {
			description: 'description',
			title: 'new task',
			completed: false,
			status: TaskStatuses.New,
			priority: TaskPriorities.Low,
			startDate: new Date(),
			deadline: new Date(),
			id: '5',
			todoListId: 'todolist1',
			order: 1,
			addedDate: new Date(),
		}
		const endState = taskReducer( startState, addTaskAC( { todolistID: 'todolist1', task: task } ) );
		
		expect(endState.todolist1.length).toBe(3);
		expect(endState.todolist2.length).toBe(2);
		expect(endState.todolist1[0].title).toBe('new task');
		expect(endState.todolist1[0].priority).toBe(TaskPriorities.Low);
	});
	
	it('should change task status', () => {
		
		const status = TaskStatuses.Draft
		const endState = taskReducer( startState,
			upDateTaskAC( { todolistID: 'todolist1', taskID: '1', newTask: { status } } ) );
		
		// expect(endState.todolist1[0].isDone).toBeTruthy();
		// expect(endState.todolist2[0].isDone).toBeFalsy();
	});
	
	it('should remove tasks object', () => {
		
		const endState = taskReducer(startState, removeTasksObjAC( {todolistID: 'todolist1' }));
		
		expect(endState.todolist1).toBeUndefined();
		expect(endState.todolist2.length).toBe(2);
	});
	
	it('should be correct changed title task', () => {
		const title = 'new task title'
		
		const endState = taskReducer(startState, upDateTaskAC({todolistID: 'todolist1',taskID: '1',newTask: {title}}));
		
		expect(endState['todolist1'][0].title).toBe('new task title')
		expect(endState.todolist2.length).toBe(2);
	});
});