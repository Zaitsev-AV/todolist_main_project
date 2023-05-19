import React from 'react';
import './App.css'
import { Header } from "./component/Header/Header";
import { TodoListList } from "./component/TodolistList/TodoListList";
import { Preloader } from "./component/common/Preloader/Preloader";
import { LinePreloader } from "./component/common/LinePreloader/LinePreloader";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App  = () => {

		return (
			<>
				<Header/>
				<LinePreloader/>
				<TodoListList/>
				<Preloader/>
			</>
		);
	};
