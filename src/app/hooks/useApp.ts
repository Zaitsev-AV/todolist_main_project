import { useAppSelector } from "@/common/hooks";
import { RequestStatusType } from "@/app/appReducer";
import { selectGlobalAppStatus, selectLocalAppStatus, selectsIsInitialized } from "@/app";

export const useApp = () => {
	const globalAppStatus = useAppSelector( selectGlobalAppStatus)
	const localAppStatus = useAppSelector( selectLocalAppStatus)
	const isInitialized = useAppSelector( selectsIsInitialized)
	
	return {
		globalAppStatus,
		localAppStatus,
		isInitialized
	}
}