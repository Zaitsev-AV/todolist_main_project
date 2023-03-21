import React, { ChangeEvent, useState } from 'react';

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
		<>
			<input value={title}
			onChange={onChangeInputHandler}
			/> <button onClick={onClickButtonHandler}>+</button>
		</>
		
	);
};