import { ResponseType } from "@/common/Api/apiProject";
import { Dispatch } from "redux";
import { setAppErrorAC, setGlobalAppStatusAC } from "@/app/appReducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(setAppErrorAC({error: data.messages[0]}))
	} else {
		dispatch(setAppErrorAC({error:'Some error occurred'}))
	}
	dispatch(setGlobalAppStatusAC({globalAppStatus:'failed'}))
}