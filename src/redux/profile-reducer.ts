import {usersAPI} from '../api/users-api'
import {profileAPI} from '../api/profile-api'
import { stopSubmit } from 'redux-form'
import { type } from 'os'
import { PostsType, PhotosType, ProfileType } from '../Types/types'
import { BaseThunkType, InferActionsTypes } from './redux-store';

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'


let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ] as Array<PostsType>,

    profile: null as ProfileType | null,
    status: "" as string | null,
    newPostText:"" 
};

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action:ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }

        case SET_STATUS:
            return { ...state, status: action.status }

        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }

        case SET_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }

        default:
            return state

    }

}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    deletePost: (postId:number) => ({ type: DELETE_POST, postId } as const),
    setUserProfile: (profile:ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatus: (status:string) => ({ type: SET_STATUS, status } as const),
    setPhotoSuccess: (photos:PhotosType) => ({ type: SET_PHOTO_SUCCESS, photos } as const)
}

//Thunks

export const getProfileThunk = (userId:number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId:number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status:string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }

}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.setPhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile:ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getProfileThunk(userId));
        } else {
            throw new Error('userId can`t be null')
        }
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }

}

export default profileReducer

export type InitialStateType = typeof initialState
//функция InferActionsTypes автоматически выводит типы экшинов которые есть внутри редьюсера
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit> >
