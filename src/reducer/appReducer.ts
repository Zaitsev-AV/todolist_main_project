const initialState: AppReducerType = {
	status: 'idle', // необходимо для того чтобы на разных стадия работы приложения давать какую-то обратную связь пользователю
	error: null // для вывода каких-то глобальных ошибок
}

export const appReducer = ( state: AppReducerType = initialState, action: ActionType ): AppReducerType => {
	switch ( action.type ) {
		case "APP/SET-APP-STATUS":
			return {
				...state, status: action.payload.status
			}
		default:
			return state
	}
}

//actions

export const setAppStatusAC = ( status: RequestStatusType ) => {
	return {
		type: "APP/SET-APP-STATUS",
		payload: { status }
	} as const
}

// types

type ActionType = ReturnType<typeof setAppStatusAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppReducerType = {
	status: RequestStatusType
	error: string | null
}

