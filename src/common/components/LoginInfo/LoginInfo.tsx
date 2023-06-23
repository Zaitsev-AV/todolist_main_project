import React from 'react';
import s from './LoginInfo.module.css'

export const LoginInfo: React.FC = () => {
	
	return (
		<div className={s.info}>
			<p>
				To log in get registered
				<a rel='noreferrer'
				   href={ 'https://social-network.samuraijs.com/' }
				   target={ '_blank' }>
					{ ' ' }
					here
				</a>
			</p>
			<p>or use common test account credentials:</p>
			<p>
				<strong>Email: free@samuraijs.com</strong>
			</p>
			<p>
				<strong>Password: free</strong>
			</p>
		</div>
	);
};