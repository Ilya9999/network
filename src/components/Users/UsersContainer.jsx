import React from 'react'
import { connect } from 'react-redux'
import {
  follow, unfollow, setCurrentPage, 
  toggleIsFollowingProgress, getUsers
}
  from '../../redux/users-reducer'
import Users from './Users'
import Preloader from '../Preloader/Preloader'
import { usersAPI } from '../../api/api'

class UsersContainer extends React.Component {

  componentDidMount() {

    this.props.getUsers(this.props.currentPage, this.props.pageSize)

  }

  onPageChanged = (pageNumber) => {

    this.props.getUsers(pageNumber, this.props.pageSize)
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
        toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }
}

let mapStateToprops = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect(mapStateToprops, {

  follow, unfollow, setCurrentPage,
  toggleIsFollowingProgress, getUsers

})(UsersContainer)