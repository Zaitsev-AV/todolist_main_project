import React, { useEffect } from 'react';
import "./App.css"

import { authThunks } from "@/feauters/Auth/authReducer";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { Layout, Preloader } from "@/common/components";
import { useApp } from "@/app/hooks/useApp";
import { useNavigate } from "react-router-dom";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App = () => {
	const { isInitialized } = useApp()
	const dispatch = useAppDispatch()

	useEffect( () => {
			dispatch( authThunks.authMe() )
	}, [] )
	
	if ( !isInitialized ) {
		return <div style={ { position: "fixed", left: "50%", top: "40%" } }><Preloader/></div>
	}

	return (
		<>
			<div className={ 'loaderWrapper' }>
				{ isInitialized && <Layout/> }
			</div>
		</>
	);
};
