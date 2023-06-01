import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { App } from "./app/App";
import "./index.css"


// const routes = createBrowserRouter( [
//     {
//         path: "/",
//         element: <App/>,
//         errorElement: <h1>Error</h1>,
//         children: [
//             {
//                 path: '/',
//                 element: <AuthRedirect/>,
//                 children: [
//                     {
//                         index: true,
//                         element: <TodoListList/>
//                     }
//                 ]
//             },
//             {
//                 path:'/auth',
//                 element: <Auth/>,
//                 children: [
//                     {
//                         path: "/auth/login",
//                         element: <Login/>,
//                     }
//                 ]
//             }
//         ]
//     }
// ])
ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
 
    <React.StrictMode>
        <Provider store={ store }>
            <App/>
        </Provider>
    </React.StrictMode>,
)
