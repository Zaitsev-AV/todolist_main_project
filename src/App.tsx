import React from 'react';
import './App.css'
import { Header } from "./component/header/Header";
import { TodoListList } from "./component/todolisrt list/TodoListList";

export type FilterValueType = 'all' | 'completed' | 'active'

export const App  = () => {

		return (
			<>
				<Header/>
				<TodoListList/>
			</>
		);
	};
