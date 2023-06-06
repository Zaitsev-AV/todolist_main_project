import React, { ChangeEvent } from 'react';
import s from './Task.module.css'
import { TaskStatuses } from "@/common/Api/apiProject";
import { CustomCheckbox, DeleteBtn, EditableText } from "@/common/components";

export type TaskPropsType = {
	title: string
	status: TaskStatuses
	todolistID: string
	taskID: string
	removeTask: ( taskID: string, todolistID: string ) => void
	newTaskTitleHandler: (taskID: string, newTitle: string)=> void
	onChangeTaskStatus: ( todolistID: string, taskID: string, status: TaskStatuses ) => void
};
export const Task: React.FC<TaskPropsType> = ( props ) => {
	const { title, status, taskID, removeTask, onChangeTaskStatus, newTaskTitleHandler, todolistID } = props
	const onClickRemoveTask = () => {
		removeTask( taskID, todolistID )
	}
	const onChangeInputStatus = ( e: ChangeEvent<HTMLInputElement>) => {
		onChangeTaskStatus(todolistID, taskID, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress )
	}
	return (
		<div className={s.taskWrapper}>
			<div>
				{/*<input type={ "checkbox" }*/}
				{/*       checked={ status === TaskStatuses.Completed }*/}
				{/*       onChange={ onChangeInputStatus }*/}
				{/*/>*/}
				<CustomCheckbox status={status} callback={onChangeInputStatus}/>
				<EditableText key={ taskID }
				              title={title}
				              callBack={( newTitle: string)=> newTaskTitleHandler(taskID, newTitle)}
				/>
			</div>

			<DeleteBtn callback={onClickRemoveTask}/>
			{/*<button onClick={ onClickRemoveTask }>-</button>*/}
		</div>
	);
};