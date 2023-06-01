import React from 'react';
import s from './LinePreloader.module.css'

export const LinePreloader: React.FC = (  ) => {

	return (
		<div className={s.wrapper}>
		<div className={s.loader}></div>
		</div>
	);
};