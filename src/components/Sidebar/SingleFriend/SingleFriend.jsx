import React from 'react'
import style from './SingleFriend.module.css'

const SingleFriend = (props) => {
    return (
        <div>
            <img src={props.foto} alt="friend" />
            <h4 className={style.friend}>{props.person}</h4>
        </div>
    )
}

export default SingleFriend