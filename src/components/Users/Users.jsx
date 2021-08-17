import React from 'react'
import Paginator from '../../components/common/Paginator/Paginator'
import User from './User'

let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {

    return (
        <div>
            {
                users.map(u => <User user={u}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}
                        key={u.id}
                    />
                )
            }

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount} pageSize={pageSize} />

        </div>
    )
}

export default Users