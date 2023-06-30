import { ResponseType } from "@/common/api/commonAPI";
import { Dispatch } from "redux";
import { setAppError, setGlobalAppStatus } from "@/app/appReducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
	if (data.messages.length) {
		dispatch(setAppError({error: data.messages[0]}))
	} else {
		dispatch(setAppError({error:'Some error occurred'}))
	}
	dispatch(setGlobalAppStatus({globalAppStatus:'failed'}))
}