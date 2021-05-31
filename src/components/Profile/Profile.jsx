import React from 'react'
import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'

let Profile = (props) => {
    return (
        <>
            <ProfileInfo  profile={props.profile} />
            {/* <MyPosts /> */}
        </>
    )
}

export default Profile