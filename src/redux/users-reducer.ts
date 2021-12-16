import { AppStateType } from './redux-store';
import { usersAPI } from '../api/api'
import { updateObjectInArray } from '../utils/validators/object-helpers'
import { type } from 'os'
import { PostsType, ContactsType, PhotosType, ProfileType, UserType } from '../Types/types'
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

const UsersReducer = (state = initialState, action: ActionTypes): initialStateType => {
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
                // users: state.users.map(u => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: false }
                //     }
                //     return u
                // })
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

type ActionTypes = FollowSuccessType | UnollowSuccessType | SetUsersType | SetCurrentPageType | SetUsersTotalCountType |
    ToggleIsFetchingType | ToggleIsFollowingProgressType

type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId })

type UnollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unollowSuccess = (userId: number): UnollowSuccessType => ({ type: UNFOLLOW, userId })

type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users })

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage })

type SetUsersTotalCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
export const setUsersTotalCount = (totalUsersCount: number): SetUsersTotalCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRES,
    isFetching: boolean,
    userId: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressType => ({ type: TOGGLE_IS_FOLLOWING_PROGRES, isFetching, userId })

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type DispatchType = Dispatch<ActionTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType =>
    async (dispatch: DispatchType, getState) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setUsersTotalCount(data.totalCount))
    }

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessType | UnollowSuccessType) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType =>
    async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }


export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unollowSuccess)
}


export default UsersReducer