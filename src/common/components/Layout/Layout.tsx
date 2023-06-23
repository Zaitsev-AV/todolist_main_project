import React, { useEffect } from 'react';
import { Header } from "@/feauters/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { RequestStatusType } from "@/app/appReducer";
import { useAppSelector } from "@/common/hooks";
import { LinePreloader } from "@/common/components";


export const Layout: React.FC = ( ) => {
	const localAppStatus = useAppSelector<RequestStatusType>( state => state.app.localAppStatus)
	    console.log("Layout")
	const isLoggedIn = useAppSelector<boolean>( state => state.auth.isLoggedIn )
	const navigate = useNavigate()
	useEffect(()=> {
		!isLoggedIn && navigate('/login')
	}, [isLoggedIn])
	return (
		<>
			<Header/>
			<div className={'loaderWrapper'}>
				{localAppStatus === "loading" &&  <LinePreloader/>}
			</div>
			<div>
				<Outlet/>
			</div>
		</>
	);
};