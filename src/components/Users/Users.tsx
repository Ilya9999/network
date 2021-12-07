import React from 'react'
import Paginator from '../common/Paginator/Error'
import User from './User'
import Pagination from "react-js-pagination";
import { type } from 'os'
import { UserType } from '../../Types/types';

type PropsType = {
    currentPage:number
    onPageChanged: (pageNumber: number) => void
    totalUsersCount:number
    pageSize:number
    users:Array<UserType>
    followingInProgress:Array<number>
    follow: (userId:number) => void
    unfollow: (userId:number) => void
}

let Users: React.FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {

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