import { Action } from "redux";

import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { todolistReducer } from "../feauters/TodolistList/Todolist/todolistReducer";
import { taskReducer } from "../feauters/TodolistList/Todolist/Task/taskReducer";
import { appReducer } from "./appReducer";
import { authReducer } from "../feauters/Auth/authReducer";

// const rootReducer = combineReducers({
// 	todoLists: todolistReducer,
// 	tasks: taskReducer,
// 	app: appReducer
// })
export type AppDispatch = typeof store.dispatch;
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppRootStateType,
	unknown,
	Action<string>
>;

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
	reducer: {
		todoLists: todolistReducer,
		tasks: taskReducer,
		app: appReducer,
		auth: authReducer
	}
})