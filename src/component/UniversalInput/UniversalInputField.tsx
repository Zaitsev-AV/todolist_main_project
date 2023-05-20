import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './UniversalInputField.module.css'

export type UniversalInputFieldTypeProps = {
callBack: (title: string)=> void
};
export const UniversalInputField: React.FC<UniversalInputFieldTypeProps> = ( { callBack } ) => {
	
	const [title, setTitle] = useState('')
	const [error, setError] = useState<string | null>(null)
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}
	const onClickButtonHandler = () => {
		if ( title.trim().length !== 0 ) {
			callBack( title )
			setTitle('')
		} else {
			setError('Title is required')
			setTitle('')
		}
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if ( error !== null ) {
			setError(null)
		}
		if ( e.code === 'Enter' ) {
			onClickButtonHandler()
		}
	}
	return (
		<div className={s.wrapper}>
			<div className={s.textInputWrapper}>
				<input value={title}
				       onChange={onChangeInputHandler}
				       onKeyDown={onKeyDownHandler}
				       placeholder={"Type Here"}
				       className={s.textInput}
				/>
				{<span style={{color: 'red'}}>{error}</span>}
			</div>
			<button className={s.btnInput} onClick={onClickButtonHandler}>+</button>
		</div>
	);
};