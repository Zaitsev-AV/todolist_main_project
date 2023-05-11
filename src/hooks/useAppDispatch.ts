import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppRootStateType } from "../reducer/store";
import { AnyAction } from "redux";

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, any, AnyAction>>()