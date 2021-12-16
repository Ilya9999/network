import { authAPI,securityAPI, ResultCodeEnum, ResultCodeForCaptcha } from '../api/api'
import { stopSubmit } from 'redux-form'
import { type } from 'os'

const SET_USER_DATA = 'SET_USER_DATA'
const UNFOLLOW = 'UNFOLLOW'
const GET_CAPTCHA_URL_SUCCESS  = 'GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl:null as string | null //if null , then captcha if not required
}

export type InitialStateType = typeof initialState

const AuthReducer = (state = initialState, action: any): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login:string | null
    isAuth:boolean 
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
})


type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
})

export const authUser = () => (dispatch: any) => {
    return authAPI.getAuth()
        .then((data:any) => {
            if (data.resultCode === ResultCodeEnum.Success) {
                let { id, email, login } = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        }) 
}

//login thunk
export const login = (email: string, password:string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        // success, get auth data
        dispatch(authUser())
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired){
            dispatch(getCaptchaUrl())
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const getCaptchaUrl = () => async (dispatch:any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))    
}


export const logout = () => async (dispatch:any) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default AuthReducer