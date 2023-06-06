import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI, LoginRequestType } from "@/common/Api/apiProject";
import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk";

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

const login = createAppAsyncThunk<void, LoginRequestType>('auth/login', async (arg, thunkAPI)=> {
	const {dispatch} = thunkAPI
	try {
		const res = await authAPI.login(arg)
		if ( res.data.resultCode === 0 ) {
			dispatch( authActions.setIsLoggedIn({isLoggedIn: true}) )
		}
	} catch ( e ) {
	
	}
})

const logOut = createAppAsyncThunk<unknown, void>('auth/login', async (arg, thunkAPI)=> {
	const {dispatch} = thunkAPI
	try {
		return await authAPI.logOut()
		// if ( res.data.resultCode === 1 ) {
		// 	dispatch( authActions.setIsLoggedIn({isLoggedIn: false}) )
		// }
	} catch ( e ) {
	
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {authMe, login, logOut}



type InitialStateType = {
	isLoggedIn: boolean
}