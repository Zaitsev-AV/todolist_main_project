import React from 'react';
import s from './LoginForm.module.css'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object( {
	email: yup.string().required().email( 'Email is not valid' ),
	password: yup.string().required().min(8, 'Password should be at least 8 characters long')
} ).required()
type FormData = yup.InferType<typeof schema>;

export const LoginForm: React.FC = () => {
	
	const { register,
		handleSubmit,
		watch, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
	const onSubmit: SubmitHandler<FormData> = data => console.log( data );
	
	return (
		<div className={ s.login_box }>
			<p>Login</p>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className={ s.user_box }>
					<input
						{ ...register( 'email' ) }
						name="email"
						type="text"
					/>
					<div className={s.error}>{ errors.email?.message }</div>
					<label>Email</label>
					
				</div>
				<div className={ s.user_box }>
					<input
						{ ...register( 'password' ) }
						name="password"
						type="password"/>
					<label>Password</label>
					<div className={s.error}>{ errors.password?.message }</div>
				</div>
				<button type='submit'>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Submit
				</button>
			</form>
			<p>Don't have an account? <a href=""
			                             className={ s.text }>Sign up!</a></p>
		</div>
	);
};