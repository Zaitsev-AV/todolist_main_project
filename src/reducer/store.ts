import { Action, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { todolistReducer } from "./todolistReducer";
import { taskReducer } from "./taskReducer";
import thunk, { ThunkAction } from "redux-thunk";
import { appReducer } from "./appReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	todoLists: todolistReducer,
	tasks: taskReducer,
	app: appReducer
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppRootStateType,
	unknown,
	Action<string>
>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// export const store = configureStore({
// 	reducer: {
// 		todoLists: todolistReducer,
// 		tasks: taskReducer,
// 		app: appReducer
// 	}
// })