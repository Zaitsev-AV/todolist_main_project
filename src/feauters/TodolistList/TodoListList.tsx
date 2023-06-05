import React, { useEffect } from 'react';
import { useAppSelector } from "@/common/hooks/useAppSelector";
import {
	addNewTodoListTC,
	changedFilterAC,
	changeTodoListTC,
	removeTodoListTC,
	setTodoListTC,
	TodoListsAppType
} from "./Todolist/todolistReducer";
import { TaskStateType, tasksThunks } from "./Todolist/Task/taskReducer";
import { RequestStatusType } from "@/app/appReducer";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { TaskStatuses } from "@/feauters/Api/apiProject";
import { FilterValueType } from "@/app/App";
import { UniversalInputField } from "@/common/components/UniversalInput/UniversalInputField";
import { Preloader } from "@/common/components/Preloader/Preloader";
import { Todolist } from "./Todolist/Todolist";
import { Notification } from "@/common/components/Notification/Notification";


export type TodoListListPropsType = {};
export const TodoListList: React.FC<TodoListListPropsType> = ( props ) => {
	const {} = props
	const todoLists = useAppSelector<TodoListsAppType[]>( state => state.todoLists )
	const tasks = useAppSelector<TaskStateType>( state => state.tasks )
	const status = useAppSelector<RequestStatusType>( state => state.app.globalAppStatus )
	const dispatch = useAppDispatch()
	useEffect( () => {
		dispatch( setTodoListTC() )
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
		dispatch(removeTodoListTC(todolistID))
	}
	const addNewTodolist = ( newTodolistTitle: string ) => {
		dispatch( addNewTodoListTC( newTodolistTitle ) )
	}
	const changedTaskText = ( todolistID: string, taskID: string, newTitle: string ) => {
		dispatch(tasksThunks.upDateTask({todolistID, taskID, newTask:{title: newTitle}}))
	}
	const changedTodolistTitle = ( todoListID: string, newTitle: string ) => {
		dispatch(changeTodoListTC(todoListID, newTitle))
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