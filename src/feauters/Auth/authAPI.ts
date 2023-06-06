import { AxiosResponse } from "axios";
import { instance, ResponseType } from "@/common/api/commonAPI";

export const authAPI = {
	authMe() {
		return instance.get<ResponseType<AuthResponseType>, AxiosResponse<ResponseType<AuthResponseType>>>('auth/me')
	},
	login(payload: LoginRequestType) {
		return instance.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>>('/auth/login', payload)
	},
	logOut() {
		return instance.delete('auth/login')
	}
}

export type LoginRequestType = {
	email: string
	password: string
	rememberMe?: boolean
}


export type AuthResponseType = {
	id: number
	email: string
	login: string
}