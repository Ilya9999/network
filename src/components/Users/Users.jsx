import React from 'react'
import Paginator from '../common/Paginator/Error'
import User from './User'
import Pagination from "react-js-pagination";

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

            <Pagination activePage={currentPage} onChange={onPageChanged}
            totalItemsCount={totalUsersCount} pageRangeDisplayed={pageSize} />

        </div>
    )
}

export default Users