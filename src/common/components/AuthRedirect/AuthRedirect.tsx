import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/common/hooks";


export const AuthRedirect: React.FC = ( ) => {
	const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
	const location = useLocation()
    console.log('AuthRedirect')
	    console.log(`auth redirect ${isLoggedIn}`)
	if ( !isLoggedIn ) {
		return  <Navigate to={'/login'} state={{from: location}}/>
	}
	return (
		<>
			<Outlet/>
		</>
	);
};