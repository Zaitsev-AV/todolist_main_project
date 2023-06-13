import { AppRootStateType } from "@/app/store";

export const selectGlobalAppStatus = (state: AppRootStateType) => state.app.globalAppStatus
export const selectLocalAppStatus = (state: AppRootStateType) => state.app.localAppStatus
export const selectsIsInitialized = (state: AppRootStateType) => state.app.isInitialized