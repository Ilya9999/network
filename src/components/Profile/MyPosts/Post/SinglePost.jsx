import React from 'react'
import profileStyle from './SinglePost.module.css'

const SinglePost = (props) => {
    return <div className={profileStyle.item}>
                
                <img src='https://i.pinimg.com/originals/13/53/55/1353554074634f9a7da4049579ea71e4.jpg'></img>
                {props.message}
                <div>
                    <span>{props.likeCount}</span>
                </div>
            </div>

}

export default SinglePost;