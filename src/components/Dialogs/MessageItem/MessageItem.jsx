import React from 'react'
import style from './../Dialogs.module.css'

const MessageItem = (props) => {
    
    return (
           <div className={style.wrappMessage}>
                <div>{props.message}</div>
            </div>
    )
}


export default MessageItem