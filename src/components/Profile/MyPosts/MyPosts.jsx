import React from 'react'
import style from './MyPosts.module.css'
import SinglePost from './Post/SinglePost'
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profile-reducer'

const MyPosts = (props) => {

    let postElement =
        props.posts.map(p => <SinglePost message={p.message} likeCount={p.likesCount} />)

    let newPostElement = React.createRef()

    let addPost = () => {
        props.dispatch(addPostCreator())
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        let action = updateNewPostTextCreator(text)
        props.dispatch(action)
    }

    return (
        <div className={style.content}>
            <div>
                <h3> My posts </h3>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
                </div>
                <div>
                    <button onClick={addPost}>Add Post</button>
                </div>
                <div className={style.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;