import React from 'react'
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
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                alt="userPhoto" width="80px" />
                        </div>
                        <div>{u.name}</div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }} >Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }} >Follow</button>
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