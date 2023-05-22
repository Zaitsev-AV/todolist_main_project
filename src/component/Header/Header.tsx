import React from 'react';
import s from './Header.module.css'
import { LoginBtn } from "../common/LoginBtn/LoginBtn";

export type HeaderPropsType = {

};
export const Header: React.FC<HeaderPropsType> = ( props ) => {
	const {  } = props
	return (
		<header className={s.wrapper}>
			<div className={s.titleWrapper}>
				<h1>TickTask</h1>
			</div>
			<div className={s.btnWrapper}>
				<LoginBtn/>
			</div>
		</header>
	);
};