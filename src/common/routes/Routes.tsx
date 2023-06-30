import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import { App } from "@/app/App";
import { AuthRedirect } from "@/common/components";
import { TodoListList } from "@/feauters/TodolistList/TodoListList";
import { LoginForm } from "@/feauters/Auth/LoginForm/LoginForm";


export const routes = createBrowserRouter( [
	{
		path: "/",
		element: <App/>,
		errorElement: <h1>Error</h1>,
		children: [
			{
				path: "/",
				element: <AuthRedirect/>,
				children: [
					{
						index: true,
						element: <TodoListList/>
					}
				]
			},
		]
	},
	{
		path:'/login',
		element: <LoginForm/>
	}
])