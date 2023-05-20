import { TypedUseSelectorHook, useSelector } from "react-redux";
import { AppRootStateType } from "../reducer/store";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector