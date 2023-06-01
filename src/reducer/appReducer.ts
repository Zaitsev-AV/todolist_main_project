import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppStateType = {
	globalAppStatus: 'idle', // необходимо для того чтобы на разных стадия работы приложения давать какую-то обратную связь пользователю
	localAppStatus: "idle", // добавил это для того, чтобы при работе с тасками можно было включать другую лоадер
	error: null // для вывода каких-то глобальных ошибок
}
//
// export const appReducer = ( state: AppStateType = initialState, action: AppActionType ): AppStateType => {
// 	switch ( action.type ) {
// 		case "APP/SET-GLOBAL-APP-STATUS":
// 			return {
// 				...state, globalAppStatus: action.payload.status
// 			}
// 		case "APP/SET-LOCAL-APP-STATUS":
// 			return {
// 				...state, localAppStatus: action.payload.status
// 			}
// 		case "APP/SET-APP-ERROR":
// 			return {
// 				...state, error: action.payload.error
// 			}
// 		default:
// 			return state
// 	}
// }

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
//actions
//
// export const setGlobalAppStatusAC = ( status: RequestStatusType ) => {
// 	return {
// 		type: "APP/SET-GLOBAL-APP-STATUS",
// 		payload: { globalAppStatus: status }
// 	} as const
// }
// export const setLocalAppStatusAC = ( status: RequestStatusType ) => {
// 	return {
// 		type: "APP/SET-LOCAL-APP-STATUS",
// 		payload: { localAppStatus: status }
// 	} as const
// }
//
// export const setAppErrorAC = ( error: null | string ) => {
// 	return {
// 		type: "APP/SET-APP-ERROR",
// 		payload: { error: error }
// 	} as const
// }
//
// // types
//
// export type AppActionType =
// 	| ReturnType<typeof setGlobalAppStatusAC>
// 	| ReturnType<typeof setLocalAppStatusAC>
// 	| ReturnType<typeof setAppErrorAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
	globalAppStatus: RequestStatusType
	localAppStatus: RequestStatusType
	error: string | null
}

