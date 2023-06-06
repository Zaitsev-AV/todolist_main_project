import React, { useEffect } from 'react';
import "./App.css"
import { RequestStatusType } from "@/app/appReducer";

import { authThunks } from "@/feauters/Auth/authReducer";
import { LoginForm } from "@/feauters/Auth/LoginForm/LoginForm";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { Layout } from "@/common/components";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App  = () => {
	const localAppStatus = useAppSelector<RequestStatusType>( state => state.app.localAppStatus)
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
useEffect(()=> {
	dispatch(authThunks.authMe())
}, [])
	    console.log('App')
	    console.log(isLoggedIn + ' app')
		return (
			<>
				<div className={'loaderWrapper'}>
					{isLoggedIn ? <Layout/> : <LoginForm/>}
				</div>
				
			</>
		);
	};
