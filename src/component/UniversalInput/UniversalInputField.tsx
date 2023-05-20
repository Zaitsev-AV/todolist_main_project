import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './UniversalInputField.module.css'

export type UniversalInputFieldTypeProps = {
	callBack: ( title: string ) => void
	type: 'todo' | 'task'
};
export const UniversalInputField: React.FC<UniversalInputFieldTypeProps> = ( { callBack, type } ) => {
	
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
			{type === 'task'
				?
				<>
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
				</>
				:
				<>
					<div className={s.inputGroup}>
						<input placeholder="Enter new todo list title here"
						       type="text"
						       value={title}
						       onChange={onChangeInputHandler}
						       onKeyDown={onKeyDownHandler}
						       className={s.inputField}/>
						<button className={ s.submitButton } onClick={onClickButtonHandler}><span>ADD</span></button>
					</div>
				</>
			}
			
		</div>
	);
};