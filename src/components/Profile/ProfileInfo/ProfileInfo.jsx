import React from 'react'
import { useState } from 'react'
import Prelaoder from '../../Preloader/Preloader'
import style from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import userPhoto from '../../../assets/images/Default-user-photo.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from './ProfileDataForm'
import cn from 'classnames'

const ProfileInfo = ({ profile, status, updateStatus, isowner, savePhoto, saveProfile }) => {
    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Prelaoder />
    }

    // let social = Object.values(profile.contacts)

    const onMainPhotoSelected = (e) => {
        // If input value has langth call calback which send your photo to the server 
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }

    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }


    return (
        <div>
            <div className={cn(style.background, style.exampleOfClassNames)}>
                <img src='https://i.redd.it/228r4jaqsmb31.jpg'></img>
            </div>
            <div className={style.descriptionBlock}>
                <img className={style.mainPhoto} src={profile.photos.large || userPhoto} />
                {/* Show input if you are owner of this page */}
                {isowner && <input type={"file"} onChange={onMainPhotoSelected} ></input>}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                {editMode 
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
                    : <ProfileData goToEditMode={activateEditMode} profile={profile} isowner={isowner} /> 
                }
                

            </div>
        </div>
    )
}

const ProfileData = ({ profile, isowner, goToEditMode }) => {
    return (
        <div>
            {isowner && <div><button onClick={goToEditMode}>Eddit</button></div>}
            <div>
                <h2>{profile.fullName}</h2>
            </div>
            
            <div>{profile.aboutMe}</div>

            <div>
                <div>
                    <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
                </div>
                {profile.lookingForAJob &&
                    <div>
                        <b>My skills</b> {profile.lookingForAJobDescription}
                    </div>
                }
            </div>

            <div>
                <b>Contacts:</b>: {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key] } />
                })}
            </div>
        </div>
    )
}

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}:</b>{contactValue}
        </div>
    )
}


export default ProfileInfo;