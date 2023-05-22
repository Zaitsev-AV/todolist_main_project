import React from 'react';
import './App.css'
import { Header } from "./component/Header/Header";
import { TodoListList } from "./component/TodolistList/TodoListList";
import { LinePreloader } from "./component/common/LinePreloader/LinePreloader";
import { useAppSelector } from "./hooks/useAppSelector";
import { RequestStatusType } from "./reducer/appReducer";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App  = () => {
	const localAppStatus = useAppSelector<RequestStatusType>( state => state.app.localAppStatus)

		return (
			<>
				<Header/>
				<div className={'loaderWrapper'}>
					{localAppStatus === "loading" && <LinePreloader/>}
				</div>
				<TodoListList/>
				
			</>
		);
	};
