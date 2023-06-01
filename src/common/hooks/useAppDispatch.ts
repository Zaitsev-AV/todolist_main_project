import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AppRootStateType } from "../../app/store";

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppRootStateType, any, AnyAction>>()