import React from 'react'
import { NavLink } from 'react-router-dom'
import { type } from 'os'
import { UserType } from '../../Types/types';
import userPhoto from '../../assets/images/Default-user-photo.png'
import style from './Users.module.css'

type PropsType = {
    user: UserType
    followingInProgress:Array<number> 
    unfollow: (id:number) => void
    follow:(id:number) => void
}

let User:React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            {
                <div>
                    <div>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                    alt="userPhoto" width="80px" />
                            </NavLink>
                        </div>
                        <div>{user.name}</div>
                        <div>
                            {user.followed
                                ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    
                                    unfollow(user.id)
                                   
                                }}>Unfollow</button>

                                : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {

                                    follow(user.id)

                                }}>Follow</button>
                            }
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default User