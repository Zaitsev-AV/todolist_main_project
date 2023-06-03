import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { authAPI } from "../Api/apiProject";

const initialState: InitialStateType = {
	isLoggedIn: false
}


const slice = createSlice( {
	name: 'auth',
	initialState,
	reducers: {
		login: ( state, action: PayloadAction<{ isLoggedIn: boolean }> ) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	}
} )

export const authReducer = slice.reducer
export const {login} = slice.actions

const loginTC = () => async ( dispatch: Dispatch ) => {
	try {
	const res = await authAPI.authMe()
		if ( res.data.resultCode === 0 ) {
			dispatch(login)
		}
	} catch ( e ) {
	
	}
}

type InitialStateType = {
	isLoggedIn: boolean
}