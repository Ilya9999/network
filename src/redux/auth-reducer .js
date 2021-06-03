import { authAPI } from '../api/api'

const SET_USER_DATA = 'SET_USER_DATA'
const UNFOLLOW = 'UNFOLLOW'



let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth:false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth:true
            }

        default:
            return state

    }

}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data:{userId, email, login} })

export const authUser = () => {

    return (dispatch) => {
        authAPI.getAuth().then(data => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
}

export default AuthReducer