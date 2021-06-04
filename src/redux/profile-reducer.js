import { usersAPI } from '../api/api'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Its my first post', likesCount: 11 }
    ],
    newPostText: 'Please write the message',
    
    profile:null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: 
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts:[newPost, ...state.posts],
                newPostText:''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText:action.newText
            }

        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }

        default:
            return state

    }

}

export const addPostCreator = () => ({ type: ADD_POST })
export const updateNewPostTextCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export const setUserProfile = (profile) => ({type:SET_USER_PROFILE, profile}) 

export const getProfileThunk = (userId) => {
    return (dispatch) => {
        usersAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
}


export default profileReducer