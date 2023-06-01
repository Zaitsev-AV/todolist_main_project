import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppStateType = {
	globalAppStatus: 'idle', // необходимо для того чтобы на разных стадия работы приложения давать какую-то обратную связь пользователю
	localAppStatus: "idle", // добавил это для того, чтобы при работе с тасками можно было включать другую лоадер
	error: null // для вывода каких-то глобальных ошибок
}

const slice = createSlice( {
	name: "app",
	initialState: initialState,
	reducers: {
		setGlobalAppStatusAC: ( state, action: PayloadAction<{ globalAppStatus: RequestStatusType }> ) => {
			state.globalAppStatus = action.payload.globalAppStatus
		},
		setLocalAppStatusAC: ( state, action: PayloadAction<{ localAppStatus: RequestStatusType }> ) => {
			state.localAppStatus = action.payload.localAppStatus
		},
		setAppErrorAC: ( state, action: PayloadAction<{ error: null | string }> ) => {
			state.error = action.payload.error
		}
	}
} )

export const appReducer = slice.reducer
export const { setGlobalAppStatusAC, setLocalAppStatusAC, setAppErrorAC } = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
	globalAppStatus: RequestStatusType
	localAppStatus: RequestStatusType
	error: string | null
}

