import { AUTH_ERROR, AUTH_GET_USERS, AUTH_LOADING, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_SUCCESS } from "./auth.types";
import { ILoginUser, IUser } from "../types/auth.types";
import { Reducer } from "redux";

interface AuthState {
    loading: boolean,
    error: boolean,
    isAuth: boolean,
    user: ILoginUser | object,
    allUsers: IUser[]
}

const initialState: AuthState = {
    loading: false,
    error: false,
    isAuth: false,
    user: {},
    allUsers: []
};

export const authReducer: Reducer<AuthState | any> = (
    state = initialState,
    { type, payload }
) => {
    switch (type) {
        case AUTH_LOADING: {
            return { ...state, loading: true, error: false };
        }

        case AUTH_ERROR: {
            return { ...state, loading: false, error: true };
        }

        case AUTH_SUCCESS: {
            return { ...state, loading: false, error: false };
        }

        case AUTH_LOGIN_SUCCESS: {
            const loginPayload = payload as { token: string; name: string; points: number };
            localStorage.setItem("userToken", JSON.stringify(loginPayload.token));
            localStorage.setItem("username", JSON.stringify(loginPayload.name));
            localStorage.setItem("userPoints", JSON.stringify(loginPayload.points));
            return { loading: false, error: false, isAuth: true, user: payload as ILoginUser };
        }

        case AUTH_LOGOUT: {
            localStorage.clear();
            return initialState;
        }

        case AUTH_GET_USERS: {
            return {...state, loading: false, error: false, allUsers: payload as IUser[]}
        }
        default:
            return state;
    }
};