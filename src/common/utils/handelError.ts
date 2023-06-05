import { Dispatch } from "redux";
import { setAppErrorAC, setGlobalAppStatusAC } from "@/app/appReducer";
import {ResponseType} from "@/feauters/Api/apiProject";
import axios, { AxiosError } from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC({error: data.messages[0]}))
	} else {
		dispatch(setAppErrorAC({error:'Some error occurred'}))
	}
	dispatch(setGlobalAppStatusAC({globalAppStatus:'failed'}))
}

// export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
// 	dispatch(setAppErrorAC(error.message ? {error: error.message } : {error: 'Some error occurred' }))
// 	dispatch(setGlobalAppStatusAC( {globalAppStatus: 'failed' }))
// }


export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
	const err = e as Error | AxiosError<{ message: string }>
	if ( axios.isAxiosError(err) ) {
		const error = err.message ? err.message : 'Some error'
		dispatch(setAppErrorAC({error}))
	} else {
		dispatch(setAppErrorAC({error: `Native error${err.message}`}))
	}
	dispatch(setGlobalAppStatusAC( {globalAppStatus: 'failed' }))
}