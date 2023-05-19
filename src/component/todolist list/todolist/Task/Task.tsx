import React, { ChangeEvent } from 'react';
import { EditableText } from "../../../editableText/EditableText";

export type TaskPropsType = {
	title: string
	todolistID: string
	taskID: string
	removeTask: ( taskID: string, todolistID: string ) => void
	newTaskTitleHandler: (taskID: string, newTitle: string)=> void
	onChangeTaskStatus: ( todolistID: string, taskID: string, newIsDone: boolean ) => void
};
export const Task: React.FC<TaskPropsType> = ( props ) => {
	const { title, taskID, removeTask, onChangeTaskStatus, newTaskTitleHandler, todolistID } = props
	const onClickRemoveTask = () => {
		removeTask( taskID, todolistID )
	}
	const onChangeInputStatus = ( e: ChangeEvent<HTMLInputElement>) => {
		onChangeTaskStatus(todolistID, taskID, e.currentTarget.checked)
	}
	return (
		<div>
			<EditableText key={ taskID }
			              title={title}
			              callBack={( newTitle: string)=> newTaskTitleHandler(taskID, newTitle)}
			/>
			<input type={ "checkbox" }
				// checked={ t.isDone }
				   onChange={ onChangeInputStatus }
			/> <button onClick={ onClickRemoveTask }>-</button>
		</div>
	);
};