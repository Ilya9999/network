import React from 'react'
import * as axios from 'axios'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/images/Default-user-photo.png'
import style from './Users.module.css'
import { usersAPI } from '../../api/api'

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for(let i = 1; i <= pagesCount; i++){
      pages.push(i)
    }



    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <div>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                    alt="userPhoto" width="80px" />
                            </NavLink>
                        </div>
                        <div>{u.name}</div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    
                                    props.unfollow(u.id)
                                   
                                }}>Unfollow</button>

                                : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {

                                    props.follow(u.id)

                                }}>Follow</button>
                            }
                        </div>

                    </div>
                </div>)
            }

            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && style.selectedPage}
                        onClick={() => {props.onPageChanged(p) }}>{p}</span>
                })}

            </div>

        </div>
    )
}

export default Users