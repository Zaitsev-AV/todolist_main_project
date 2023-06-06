import React, { useEffect } from 'react';
import {
	changedFilterAC,
	TodoListsAppType, todolistThunks
} from "./Todolist/todolistReducer";
import { TaskStateType, tasksThunks } from "./Todolist/Task/taskReducer";
import { RequestStatusType } from "@/app/appReducer";
import { TaskStatuses } from "@/common/Api/apiProject";
import { FilterValueType } from "@/app/App";
import { Todolist } from "./Todolist/Todolist";
import { Notification, Preloader, UniversalInputField } from "@/common/components";
import { useAppDispatch, useAppSelector } from "@/common/hooks";


export type TodoListListPropsType = {};
export const TodoListList: React.FC<TodoListListPropsType> = ( props ) => {
	const {} = props
	const todoLists = useAppSelector<TodoListsAppType[]>( state => state.todolists )
	const tasks = useAppSelector<TaskStateType>( state => state.tasks )
	const status = useAppSelector<RequestStatusType>( state => state.app.globalAppStatus )
	const dispatch = useAppDispatch()
	useEffect( () => {
		dispatch( todolistThunks.setTodolist() )
	}, [] )
	
	const removeTask = ( taskID: string, todolistID: string ) => {
		dispatch( tasksThunks.removeTask( { todolistID, taskID } ) )
	}
	
	const addTask = ( todoListID: string, title: string ) => {
		dispatch( tasksThunks.addTask( { todoListID, title }) )
	}
	const onChangeTaskStatus = ( todolistID: string, taskID: string, status: TaskStatuses ) => {
		dispatch(tasksThunks.upDateTask({todolistID, taskID, newTask: { status }}))
	}
	const changedFilter = ( todolistID: string, newFilter: FilterValueType ) => {
		dispatch( changedFilterAC( { todolistID, newFilter } ) )
	}
	const removeTodolist = ( todolistID: string ) => {
		dispatch(todolistThunks.removeTodolist( { todolistID }))
	}
	const addNewTodolist = ( todoListTitle: string ) => {
		dispatch( todolistThunks.addNewTodolist( { todoListTitle } ) )
	}
	const changedTaskText = ( todolistID: string, taskID: string, newTitle: string ) => {
		dispatch(tasksThunks.upDateTask({todolistID, taskID, newTask:{title: newTitle}}))
	}
	const changedTodolistTitle = ( todolistID: string, title: string ) => {
		dispatch(todolistThunks.changeTodolist( { todolistID, title }))
	}
	return (
		
		<div>
			<div>
				<UniversalInputField callBack={ addNewTodolist } type={'todo'}/>
			</div>
			<Notification/>
			<div className={ 'app' }>
				{ status === 'loading' ?( <span className='preloader'><Preloader/></span> ) :
					<>
					{
						todoLists.map( el => {
							let taskForTodolist = tasks[ el.id ]
							el.filter === 'active' ? taskForTodolist = taskForTodolist.filter(
									el => el.status === TaskStatuses.InProgress )
								: el.filter === 'completed' ? taskForTodolist = taskForTodolist.filter(
										el => el.status === TaskStatuses.Completed )
									: 'all' // logic for filter
							
							return (
								<Todolist
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
							)
						} )
					}
					</>
				}
			</div>
		</div>
	);
};