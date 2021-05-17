import React from 'react'
import style from './MyPosts.module.css'
import SinglePost from './Post/SinglePost'


const MyPosts = (props) => {
    let postElement =
        props.posts.map(p => <SinglePost message={p.message} likeCount={p.likesCount} />)

    let newPostElement = React.createRef()

    let onAddPost = () => {
        props.addPost()
    }

    let onPostChange = () => {
        let text = newPostElement.current.value
        props.updateNewPostText(text)
    }

    return (
        <div className={style.content}>
            <div>
                <h3> My posts </h3>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
                </div>
                <div>
                    <button onClick={onAddPost}>Add Post</button>
                </div>
                <div className={style.posts}>
                    {postElement}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;