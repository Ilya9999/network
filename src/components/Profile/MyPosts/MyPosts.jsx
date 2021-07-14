import React from 'react'
import style from './MyPosts.module.css'
import SinglePost from './Post/SinglePost'
import { Field, reduxForm } from 'redux-form'


const MyPosts = (props) => {
    
    let postElement = props.posts.map(p => <SinglePost message={p.message} likeCount={p.likesCount} />)
    let newPostElement = React.createRef()

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={style.content}>
            <div>
                <h3> My posts </h3>
                <AddNewPostFormRedux onSubmit={onAddPost} />
                <div className={style.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    )
}

const AddNewPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} >
            <Field name="newPostText" component="textarea"/>
            <div>
                <button>Add Post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form:'ProfileAddNewPostForm'}) (AddNewPostForm)

export default MyPosts;