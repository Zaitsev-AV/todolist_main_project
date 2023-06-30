import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: AppStateType = {
	isInitialized: false,
	globalAppStatus: 'idle', // необходимо для того чтобы на разных стадия работы приложения давать какую-то обратную связь пользователю
	localAppStatus: "idle", // добавил это для того, чтобы при работе с тасками можно было включать другую лоадер
	error: null // для вывода каких-то глобальных ошибок
}

const slice = createSlice( {
	name: "app",
	initialState: initialState,
	reducers: {
		setGlobalAppStatus: ( state, action: PayloadAction<{ globalAppStatus: RequestStatusType }> ) => {
			state.globalAppStatus = action.payload.globalAppStatus
		},
		setLocalAppStatus: ( state, action: PayloadAction<{ localAppStatus: RequestStatusType }> ) => {
			state.localAppStatus = action.payload.localAppStatus
		},
		setAppError: ( state, action: PayloadAction<{ error: null | string }> ) => {
			state.error = action.payload.error
			toast.error(action.payload.error + " 🙈")
		},
		setIsInitialized: ( state, action: PayloadAction<{ isInitialized: boolean }> ) => {
			state.isInitialized = action.payload.isInitialized
		}
	}
} )

export const appReducer = slice.reducer
export const { setGlobalAppStatus, setLocalAppStatus, setAppError, setIsInitialized } = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
	isInitialized: boolean
	globalAppStatus: RequestStatusType
	localAppStatus: RequestStatusType
	error: string | null
}

