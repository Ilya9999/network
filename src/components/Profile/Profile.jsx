import React from 'react'
import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'

let Profile = (props) => {
    return (
        <>
            <ProfileInfo profile={props.profile} status={props.status} 
            updateStatus={props.updateStatus} />
            <MyPosts posts={props.posts} />
        </>
    )
}

export default Profile