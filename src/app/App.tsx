import React from 'react';
import "./App.css"
import { Header } from "../feauters/Header/Header";
import { TodoListList } from "../feauters/TodolistList/TodoListList";
import { LinePreloader } from "../common/components/LinePreloader/LinePreloader";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { RequestStatusType } from "../app/appReducer";
import { LoginForm } from "../feauters/LoginForm/LoginForm";

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
				<LoginForm/>
			</>
		);
	};
