import { InferActionsTypes } from './redux-store';
import { authAPI } from '../api/auth-api'
import { stopSubmit } from 'redux-form'
import { type } from 'os';
import { authUser } from './auth-reducer '

const INITIALIZED_SUCCESS = 'SN/APP/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState

//функция InferActionsTypes автоматически выводит типы экшинов которые есть внутри редьюсера
type ActionsType = InferActionsTypes<typeof actions>

const AppReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state

    }

}

export const actions = { 
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS })
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authUser())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}


export default AppReducer