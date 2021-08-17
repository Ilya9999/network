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

class UsersContainer extends React.Component {

  componentDidMount() {
    const {currentPage,pageSize} = this.props
    this.props.requestUsers(currentPage, pageSize)

  }

  onPageChanged = (pageNumber) => {
    const {pageSize} = this.props
    this.props.requestUsers(pageNumber, pageSize)
    this.props.setCurrentPage(pageNumber)

  }


  render() {
    return <>
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

let mapStateToprops = (state) => {
  return {
    users: getUsers(state) ,
    pageSize: getPageSize(state) ,
    totalUsersCount: getTotalUsersCount(state) ,
    currentPage: getCurrentPage(state) ,
    isFetching: getIsFetching(state) ,
    followingInProgress: getFollowingInProgress(state)
  }
}


export default compose(
  connect(mapStateToprops, {

    follow, unfollow, setCurrentPage,
    toggleIsFollowingProgress, requestUsers

  })
)(UsersContainer)