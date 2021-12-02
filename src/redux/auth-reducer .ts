import { authAPI,securityAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { type } from 'os'

const SET_USER_DATA = 'SET_USER_DATA'
const UNFOLLOW = 'UNFOLLOW'
const GET_CAPTCHA_URL_SUCCESS  = 'GET_CAPTCHA_URL_SUCCESS'

export type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null,
    isAuth: boolean,
    captchaUrl:string | null
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl:null //if null , then captcha if not required
}

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
            if (data.resultCode === 0) {
                let { id, email, login } = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        }) 
}

//login thunk
export const login = (email: string, password:string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        // success, get auth data
        dispatch(authUser())
    } else {
        if (response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
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
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default AuthReducer