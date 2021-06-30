import React from 'react'
import { connect } from 'react-redux'
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profile-reducer'
import MyPosts from './MyPosts'

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostCreator())
        },
        updateNewPostText: (text) => {
            let action = updateNewPostTextCreator(text)
            dispatch(action)
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts)

export default MyPostsContainer;