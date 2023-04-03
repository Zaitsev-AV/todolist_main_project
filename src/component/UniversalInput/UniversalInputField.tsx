import React, { ChangeEvent, useState } from 'react';
import s from './UniversalInputField.module.css'

export type UniversalInputFieldTypeProps = {
callBack: (title: string)=> void
};
export const UniversalInputField: React.FC<UniversalInputFieldTypeProps> = ( props ) => {
	const { callBack } = props
	const [title, setTitle] = useState('')
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}
	const onClickButtonHandler = () => {
		callBack( title )
		setTitle('')
	}
	
	return (
		<div className={s.wrapper}>
			<div className={s.textInputWrapper}>
				<input value={title}
				       onChange={onChangeInputHandler}
				       placeholder={"Type Here"}
				       className={s.textInput}
				/>
			</div>
			<button className={s.btnInput} onClick={onClickButtonHandler}>+</button>
		</div>
		
		
	);
};