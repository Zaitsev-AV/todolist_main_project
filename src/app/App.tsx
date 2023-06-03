import React, { useEffect } from 'react';
import "./App.css"
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { RequestStatusType } from "@/app/appReducer";
import { Layout } from "@/common/components/Layout/Layout";
import { Preloader } from "@/common/components/Preloader/Preloader";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { authThunks } from "@/feauters/Auth/authReducer";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App  = () => {
	const localAppStatus = useAppSelector<RequestStatusType>( state => state.app.localAppStatus)
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
useEffect(()=> {
	dispatch(authThunks.authMe())
}, [])
	    console.log('App')
		return (
			<>
				<div className={'loaderWrapper'}>
					{isLoggedIn ? <Layout/> : <Preloader/>}
				</div>
				
			</>
		);
	};
