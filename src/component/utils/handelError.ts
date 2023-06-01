import { Dispatch } from "redux";
import { setAppErrorAC, setGlobalAppStatusAC } from "../../reducer/appReducer";
import { ResponseType } from "../api/api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC({error: data.messages[0]}))
	} else {
		dispatch(setAppErrorAC({error:'Some error occurred'}))
	}
	dispatch(setGlobalAppStatusAC({globalAppStatus:'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
	dispatch(setAppErrorAC(error.message ? {error: error.message } : {error: 'Some error occurred' }))
	dispatch(setGlobalAppStatusAC( {globalAppStatus: 'failed' }))
}