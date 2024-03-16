import { ILoginUser, IUser } from "../types/auth.types"
import { AUTH_ERROR, AUTH_GET_USERS, AUTH_LOADING, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_SUCCESS } from "./auth.types"

export const loadAuth = () => ({ type: AUTH_LOADING })
export const errorAuth = () => ({ type : AUTH_ERROR })
export const successAuth = () => ({ type : AUTH_SUCCESS })
export const successLoginAuth = (payload : ILoginUser) => ({ type: AUTH_LOGIN_SUCCESS, payload })
export const logoutAuth = () => ({ type : AUTH_LOGOUT })
export const getAllUsers = (payload: IUser[]) => ({ type : AUTH_GET_USERS, payload })