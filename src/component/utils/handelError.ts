import { Dispatch } from "redux";
import { AppActionType, setAppErrorAC, setGlobalAppStatusAC } from "../../reducer/appReducer";
import { ResponseType } from "../api/api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionType>) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC(data.messages[0]))
	} else {
		dispatch(setAppErrorAC('Some error occurred'))
	}
	dispatch(setGlobalAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionType>) => {
	dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
	dispatch(setGlobalAppStatusAC('failed'))
}