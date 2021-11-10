import React, { PureComponent } from 'react'
import style from './MyPosts.module.css'
import SinglePost from './Post/SinglePost'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../FormsControls/FormsControls'

const maxLength10 = maxLengthCreator(10)

let AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" component={Textarea} placeholder={"Post message"}
                validate={[required, maxLength10]} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}

let AddNewPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)


const MyPosts = React.memo (props => {
        let postElement = 
        [...props.posts]
        .reverse()
        .map(p => <SinglePost key={p.id} message={p.message} likeCount={p.likesCount} key={p.id} />)
        let newPostElement = React.createRef();

        let onAddPost = (values) => {
            props.addPost(values.newPostText);
        }

        return (
            <div className={style.content}>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost} />
                <div className={style.posts}>
                    {postElement}
                </div>
            </div>
        )
})  


export default MyPosts;


