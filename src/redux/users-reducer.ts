// import { InitialStateType } from './app-reducer ';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { usersAPI } from '../api/users-api'
import { updateObjectInArray } from '../utils/validators/object-helpers'
import { type } from 'os'
import { UserType } from '../Types/types'
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRES = 'TOGGLE_IS_FOLLOWING_PROGRES'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id 
}

type initialStateType = typeof initialState

const UsersReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', { followed: false })
            }

        case SET_USERS: {
            return { ...state, users: action.users }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case TOGGLE_IS_FOLLOWING_PROGRES: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state

    }

}

export const actions = {
    followSuccess: (userId: number) => ({ type: FOLLOW, userId }as const),
    unollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId }as const),
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users }as const),
    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage }as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching }as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFetching, userId }as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkType =>
    async (dispatch: DispatchType, getState) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setUsersTotalCount(data.totalCount))
    }

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType =>
    async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }


export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unollowSuccess)
}


export default UsersReducer

export type InitialStateTypeeType = typeof initialState
//функция InferActionsTypes автоматически выводит типы экшинов которые есть внутри редьюсера
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
type DispatchType = Dispatch<ActionsType>