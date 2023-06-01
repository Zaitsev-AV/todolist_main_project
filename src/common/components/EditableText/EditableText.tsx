import React, { ChangeEvent, useState } from 'react';

export type MarkTitlePropsType = {
	callBack: (newTitle: string) => void
	title: string
};
export const EditableText: React.FC<MarkTitlePropsType> = ( props ) => {
	const {title, callBack} = props
	
	const [ editMode, setEditMode ] = useState( false )
	const [ text,setText  ] = useState('')
	const onClickSpanHandler = () => {
		setEditMode( true )
		setText(title)
	}
	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
	setText(e.currentTarget.value)
	}
	const deactivateViewMode = () => {
	setEditMode(false)
		callBack(text)
	}
	return (
		<>
			{ editMode
				? <input value={text}
												 onChange={onChangeInputHandler} autoFocus
												 onBlur={deactivateViewMode}/>
				: <span onDoubleClick={ onClickSpanHandler }>{title}</span>
				}
		</>
	);
};