import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/common/utils/createAppAsyncThunk";
import { authAPI, LoginRequestType } from "@/feauters/Auth/authAPI";
import { setIsInitialized } from "@/app/appReducer";
import { handleServerAppError, handleServerNetworkError } from "@/common/utils";
import { toast } from "react-toastify";

const initialState: InitialStateType = {
	isLoggedIn: false
}


const slice = createSlice( {
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedIn: ( state, action: PayloadAction<{ isLoggedIn: boolean }> ) => {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
	extraReducers: builder =>  {
		builder.addCase(logOut.fulfilled, (state)=> {
			state.isLoggedIn = false
		})
	}
} )
const authMe = createAppAsyncThunk<void, void>( 'auth/me', async ( arg, thunkAPI ) => {
		const {dispatch} = thunkAPI
		try {
			const res = await authAPI.authMe()
			if ( res.data.resultCode === 0 ) {
				dispatch( authActions.setIsLoggedIn({isLoggedIn: true}) )
			} else {
				handleServerAppError(res.data, dispatch)
			}
		} catch ( e ) {
			handleServerNetworkError((e as any).message, dispatch)
		} finally {
			dispatch(setIsInitialized({isInitialized: true}))
		}
	}
)

const login = createAppAsyncThunk<void, LoginRequestType>('auth/login', async (arg, thunkAPI)=> {
	const {dispatch} = thunkAPI
	try {
		const res = await authAPI.login(arg)
		if ( res.data.resultCode === 0 ) {
			dispatch( authActions.setIsLoggedIn({isLoggedIn: true}) )
			toast.success('You have successfully logged in 👍')
		} else {
			handleServerAppError(res.data, dispatch)
		}
	} catch ( e ) {
		handleServerNetworkError((e as any).message, dispatch)
	}
})

const logOut = createAppAsyncThunk<unknown, void>('auth/login', async (arg, thunkAPI)=> {
	const {dispatch} = thunkAPI
	try {
		return await authAPI.logOut()
	} catch ( e ) {
		handleServerNetworkError((e as any).message, dispatch)
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {authMe, login, logOut}



type InitialStateType = {
	isLoggedIn: boolean
}