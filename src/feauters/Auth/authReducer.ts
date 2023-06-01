import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

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

const loginTC = () => async ( dispatch: Dispatch ) => {
	try {
	
	} catch ( e ) {
	
	}
}

type InitialStateType = {
	isLoggedIn: boolean
}