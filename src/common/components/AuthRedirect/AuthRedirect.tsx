import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/common/hooks";


export const AuthRedirect: React.FC = ( ) => {
	const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    console.log('AuthRedirect')
	    console.log(`auth redirect ${isLoggedIn}`)
	return (
		<>
			{!isLoggedIn ? <Navigate to={'/login'}/> : <Outlet/>}
		</>
	);
};