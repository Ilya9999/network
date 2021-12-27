import { BaseThunkType} from './redux-store';
import { InferActionsTypes } from './redux-store';
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from '../api/api'
import { authAPI} from '../api/auth-api'
import { securityAPI} from '../api/security-api'
import { stopSubmit } from 'redux-form'
import { type } from 'os'
import { Action } from 'redux';

const SET_USER_DATA = 'SET_USER_DATA'
const UNFOLLOW = 'UNFOLLOW'
const GET_CAPTCHA_URL_SUCCESS  = 'GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    userId:null as (number | null),
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl:null as string | null //if null , then captcha if not required
}

const AuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, payload: { userId, email, login, isAuth }
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
    } as const)
}

export const  setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
})

export const authUser = (): ThunkType => (dispatch) => {
    return authAPI.getAuth()
        .then((data:any) => {
            if (data.resultCode === ResultCodeEnum.Success) {
                let { id, email, login } = data.data
                dispatch(actions.setAuthUserData(id, email, login, true))
            }
        }) 
}

//login thunk
export const login = (email: string, password:string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        // success, get auth data
        dispatch(authUser())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch:any) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))    
}


export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}


export default AuthReducer

export type InitialStateType = typeof initialState
//функция InferActionsTypes автоматически выводит типы экшинов которые есть внутри редьюсера
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType< ActionsType | ReturnType<typeof stopSubmit> >
