import React from 'react'
import * as axios from 'axios'
import { NavLink } from 'react-router-dom'
import userPhoto from '../../assets/images/Default-user-photo.png'
import style from './Users.module.css'

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
                                ? <button onClick={() => {

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': '17f7ab2b-d784-4911-a83d-3d0636885100'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }

                                        })


                                }}>Unfollow</button>

                                : <button onClick={() => {

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            'API-KEY': '17f7ab2b-d784-4911-a83d-3d0636885100'
                                        }
                                    })
                                        .then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }

                                        })

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