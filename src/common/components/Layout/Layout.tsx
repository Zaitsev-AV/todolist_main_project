import React from 'react';
import { Header } from "@/feauters/Header/Header";
import { Outlet } from "react-router-dom";
import { LinePreloader } from "@/common/components/LinePreloader/LinePreloader";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { RequestStatusType } from "@/app/appReducer";


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