import React from 'react'
import { connect } from 'react-redux'
import {
  follow, unfollow, setCurrentPage,
  toggleIsFollowingProgress, requestUsers
} 
from '../../redux/users-reducer'
import { getPageSize, 
  getTotalUsersCount, getCurrentPage, 
  getIsFetching, getFollowingInProgress, getUsers } 
from '../../redux/users-selectors'
import Users from './Users'
import Preloader from '../Preloader/Preloader'
import { compose } from 'redux'
import { UserType } from '../../Types/types';
import { type } from 'os'
import { AppStateType } from '../../redux/redux-store'


type MapStatePropsTypes = {
  currentPage:number
  pageSize:number
  isFetching:boolean
  users:Array<UserType>
  followingInProgress:Array<number>
  totalUsersCount:number
}

type MapDispaatchPropsTypes = {
  requestUsers:(currentPage:number, pageSize:number) => void
  setCurrentPage: (pageNumber:number) => void
  follow: (userId:number) => void
  unfollow: (userId:number) => void
}

type OwnPropsTypes = {
  pageTitle:string
}

type PropsTypes = MapStatePropsTypes & MapDispaatchPropsTypes & OwnPropsTypes

class UsersContainer extends React.Component<PropsTypes> {

  componentDidMount() {
    const {currentPage,pageSize} = this.props
    this.props.requestUsers(currentPage, pageSize)

  }

  onPageChanged = (pageNumber: number) => {
    const {pageSize} = this.props
    this.props.requestUsers(pageNumber, pageSize)
    this.props.setCurrentPage(pageNumber)

  }


  render() {
    return <>
      <h2>{this.props.pageTitle}</h2>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize} currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

let mapStateToprops = (state: AppStateType): MapStatePropsTypes  => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
}


export default compose(
  connect<MapStatePropsTypes, MapDispaatchPropsTypes, OwnPropsTypes, AppStateType>(mapStateToprops, {

    follow, unfollow, requestUsers,setCurrentPage

  })
)(UsersContainer)