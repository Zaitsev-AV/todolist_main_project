import React from 'react';
import  s from './LoginForm.module.css'

export const LoginForm: React.FC = () => {
	
	return (
		<div className={ s.login_box }>
			<p>Login</p>
			<form>
				<div className={ s.user_box }>
					<input
						name=""
						type="text"/>
					<label>Email</label>
				</div>
				<div className={ s.user_box }>
					<input name=""
					       type="password"/>
					<label>Password</label>
				</div>
				<a href="#">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Submit
				</a>
			</form>
			<p>Don't have an account? <a href=""
			                             className={ s.text }>Sign up!</a></p>
		</div>
	);
};