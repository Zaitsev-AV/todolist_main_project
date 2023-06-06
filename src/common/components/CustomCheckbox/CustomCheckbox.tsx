import React, { ChangeEvent } from 'react';
import s from './CustomCheckbox.module.css'
import { TaskStatuses } from "@/common/enums";

export type CustomCheckboxPropsType = {
	status: TaskStatuses
	callback: (e: ChangeEvent<HTMLInputElement>)=> void
};
export const CustomCheckbox: React.FC<CustomCheckboxPropsType> = ( props ) => {
	const { status, callback } = props
	return (
		<label className={ s.container }>
			<input type="checkbox"
			       checked={ status === TaskStatuses.Completed }
					onChange={callback}
			/>
			<div className={ s.checkmark }></div>
		</label>
	);
};