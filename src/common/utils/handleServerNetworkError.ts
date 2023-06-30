import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { setAppError, setGlobalAppStatus } from "@/app/appReducer";

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
	const err = e as Error | AxiosError<{ message: string }>
	if ( axios.isAxiosError(err) ) {
		const error = err.message ? err.message : 'Some error'
		dispatch(setAppError({error}))
	} else {
		dispatch(setAppError({error: `Native error${err.message}`}))
	}
	dispatch(setGlobalAppStatus( {globalAppStatus: 'failed' }))
}