import React, { ChangeEvent } from 'react';
import { EditableText } from "../../../EditableText/EditableText";
import { TaskStatuses } from "../../../api/api";

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
		<div>
			<EditableText key={ taskID }
			              title={title}
			              callBack={( newTitle: string)=> newTaskTitleHandler(taskID, newTitle)}
			/>
			<input type={ "checkbox" }
				checked={ status === TaskStatuses.Completed }
				   onChange={ onChangeInputStatus }
			/> <button onClick={ onClickRemoveTask }>-</button>
		</div>
	);
};