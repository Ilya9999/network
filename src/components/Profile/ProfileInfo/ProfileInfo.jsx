import React from 'react'
import Prelaoder from '../../Preloader/Preloader'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {

    if(!props.profile){
        return <Prelaoder />
    }
    
    let social = Object.values(props.profile.contacts)

    
    return (
        <div>
            {/* <div className={style.background}>
                <img src='https://i.redd.it/228r4jaqsmb31.jpg'></img>
            </div> */}
            <div className={style.descriptionBlock}>
                <img src={props.profile.photos.small} />
                <ProfileStatus status={"Hello my friends"} />
                <div>{props.profile.aboutMe}</div>
                <span><h3>My Contacts</h3></span>
                <div className={style.link}><a>{social}</a></div>
    </div>
        </div>
    )
}


export default ProfileInfo;