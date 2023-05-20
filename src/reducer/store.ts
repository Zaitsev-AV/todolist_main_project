import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { todolistReducer } from "./todolistReducer";
import { taskReducer } from "./taskReducer";
import thunk from "redux-thunk";
import { appReducer } from "./appReducer";

const rootReducer = combineReducers({
	todoLists: todolistReducer,
	tasks: taskReducer,
	app: appReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
