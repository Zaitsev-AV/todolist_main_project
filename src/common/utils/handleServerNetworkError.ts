import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { setAppErrorAC, setGlobalAppStatusAC } from "@/app/appReducer";

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