import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getProfileThunk, getStatus, updateStatus} from '../../redux/profile-reducer'
import Profile from './Profile'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedId
            if(!userId) {
                this.props.history.push('/login')
            }
        }

        this.props.getProfileThunk(userId)
        this.props.getStatus(userId)
        

    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} 
                posts={this.props.posts} status={this.props.status} 
                updateStatus={this.props.updateStatus} />
            </div>
        )

    }
}

   
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    status: state.profilePage.status,
    authorizedId: state.auth.userId,
    isAuth: state.auth.isAuth
})



export default compose(
    connect(mapStateToProps, { getProfileThunk, getStatus, updateStatus}),
    withRouter,
)(ProfileContainer)