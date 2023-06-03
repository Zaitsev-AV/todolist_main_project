import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../Api/apiProject";
import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunks";

const initialState: InitialStateType = {
	isLoggedIn: false
}


const slice = createSlice( {
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedIn: ( state, action: PayloadAction<{ isLoggedIn: boolean }> ) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	}
} )
const authMe = createAppAsyncThunk<void, void>( 'auth/me', async ( arg, thunkAPI ) => {
		const {dispatch} = thunkAPI
		try {
			const res = await authAPI.authMe()
			if ( res.data.resultCode === 0 ) {
				dispatch( authActions.setIsLoggedIn({isLoggedIn: true}) )
			}
		} catch ( e ) {
		
		}
	}
)

const login = createAppAsyncThunk<void, void>('auth/login', async (arg, thunkAPI)=> {

})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {authMe}



type InitialStateType = {
	isLoggedIn: boolean
}