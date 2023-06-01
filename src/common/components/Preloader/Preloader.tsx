import React from 'react';
import s from './Preloader.module.css';

export const Preloader: React.FC = () => {
	return (
		<div className={s.loader}></div>
	);
};
