import { describe, it } from 'vitest';
import { removeTasksObjAC, taskReducer, TaskStateType, tasksThunks } from "./taskReducer";
import { TaskPriorities, TaskStatuses } from "@/common/enums";
import { TaskType } from "@/feauters/TodolistList/Todolist/Task/taskAPI";


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
		const arg = { todolistID: 'todolist1', taskID: '1' }
		const endState = taskReducer( startState,
			tasksThunks.removeTask.fulfilled(
				arg,
				'todolist1',
				arg ) );
		
		expect( endState.todolist1.length ).toBe( 1 );
		expect( endState.todolist2.length ).toBe( 2 );
		expect( endState.todolist1.every( ( t ) => t.id !== '1' ) ).toBeTruthy();
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
		const endState = taskReducer( startState,
			tasksThunks.addTask.fulfilled(
				{ todoListID: 'todolist1', task: task },
				'',
				{ todoListID: task.todoListId, title: task.title } ) );
		
		expect( endState.todolist1.length ).toBe( 3 );
		expect( endState.todolist2.length ).toBe( 2 );
		expect( endState.todolist1[ 0 ].title ).toBe( 'new task' );
		expect( endState.todolist1[ 0 ].priority ).toBe( TaskPriorities.Low );
	});
	
	it('should change task status', () => {
		
		const status = TaskStatuses.Draft
		const endState = taskReducer( startState,
			tasksThunks.upDateTask.fulfilled( { todolistID: 'todolist1', taskID: '1', newTask: { status } }, '',
				{ newTask:{status},  taskID: '1', todolistID: 'todolist1' } ) );
		
		expect(endState.todolist1[0].status).toBe(status);
		expect(endState.todolist2[0].status).toBe(TaskStatuses.New);
	});
	
	it('should remove tasks object', () => {
		
		const endState = taskReducer(startState, removeTasksObjAC( {todolistID: 'todolist1' }));
		
		expect(endState.todolist1).toBeUndefined();
		expect(endState.todolist2.length).toBe(2);
	});
	
	it('should be correct changed title task', () => {
		const title = 'new task title'
		const args = {todolistID: 'todolist1',taskID: '1',newTask: {title}}
		const endState = taskReducer(startState, tasksThunks.upDateTask.fulfilled(
			args,
			'',
			args));
		
		expect(endState['todolist1'][0].title).toBe('new task title')
		expect(endState.todolist2.length).toBe(2);
	});
});