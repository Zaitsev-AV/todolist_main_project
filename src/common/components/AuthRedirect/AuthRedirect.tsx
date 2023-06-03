import React from 'react';
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { Navigate, Outlet } from "react-router-dom";


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