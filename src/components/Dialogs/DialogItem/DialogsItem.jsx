import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './../Dialogs.module.css'

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={style.dialog + ' ' + style.active}>
            <NavLink to={path}>
                <div className={style.wrappMessage}>
                    <div>{props.name}</div>
                </div>
            </NavLink>
        </div>
    )
}


export default DialogItem