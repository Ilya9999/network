import React from 'react'
import style from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return (
        <div>
            <div className={style.background}>
                <img src='https://i.redd.it/228r4jaqsmb31.jpg'></img>
            </div>
            <div className={style.descriptionBlock}>
                description
    </div>
        </div>
    )
}

export default ProfileInfo;