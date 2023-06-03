import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { App } from "./app/App";
import "./index.css"
import { AuthRedirect } from "@/common/components/AuthRedirect/AuthRedirect";
import { TodoListList } from "@/feauters/TodolistList/TodoListList";
import { LoginForm } from "@/feauters/LoginForm/LoginForm";


const routes = createBrowserRouter( [
    {
        path: "/",
        element: <App/>,
        errorElement: <h1>Error</h1>,
        children: [
            {
                path: '/',
                element: <AuthRedirect/>,
                children: [
                    {
                        index: true,
                        element: <TodoListList/>
                    }
                ]
            },
            {
                path:'/login',
                element: <LoginForm/>,
                children: [
                    // {
                    //     path: "/auth/login",
                    //     element: <Login/>,
                    // }
                ]
            }
        ]
    }
])
ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
 
        <Provider store={ store }>
            <RouterProvider router={routes}/>
        </Provider>
)
