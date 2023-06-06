import React from 'react';
import { Header } from "@/feauters/Header/Header";
import { Outlet } from "react-router-dom";
import { RequestStatusType } from "@/app/appReducer";
import { useAppSelector } from "@/common/hooks";
import { LinePreloader } from "@/common/components";


export const Layout: React.FC = ( ) => {
	const localAppStatus = useAppSelector<RequestStatusType>( state => state.app.localAppStatus)
	    console.log("Layout")
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