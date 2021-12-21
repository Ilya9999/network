import {usersAPI} from '../api/users-api'
import {profileAPI} from '../api/profile-api'
import { stopSubmit } from 'redux-form'
import { type } from 'os'
import { PostsType, ContactsType, PhotosType, ProfileType } from '../Types/types'

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

const profileReducer = (state = initialState, action:any): initialStateType => {
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

//Action Creators

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: string
}

type DeletePostType = {
    type: typeof DELETE_POST,
    postId:number

}

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile:ProfileType
}

type SetStatusType = {
    type: typeof SET_STATUS,
    status:string
}

type SetPhotoSuccessType = {
    type: typeof SET_PHOTO_SUCCESS,
    photos:PhotosType
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({ type: ADD_POST, newPostText })
export const deletePost = (postId:number): DeletePostType => ({ type: DELETE_POST, postId })
export const setUserProfile = (profile:ProfileType): SetUserProfileType => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status:string): SetStatusType => ({ type: SET_STATUS, status })
export const setPhotoSuccess = (photos:PhotosType): SetPhotoSuccessType => ({ type: SET_PHOTO_SUCCESS, photos })

//Thunks

export const getProfileThunk = (userId:number) => async (dispatch:any) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}

export const getStatus = (userId:number) => async (dispatch:any) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data))
}

export const updateStatus = (status:string) => async (dispatch:any) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }

}

export const savePhoto = (file:any) => async (dispatch:any) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(setPhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        dispatch(getProfileThunk(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }

}



export default profileReducer