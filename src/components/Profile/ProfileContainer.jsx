import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getProfileThunk } from '../../redux/profile-reducer'
import Profile from './Profile'
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

    componentDidMount() {

        let userId = this.props.match.params.userId
        this.props.getProfileThunk(userId)

    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )

    }
}



   
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})



export default compose(
    connect(mapStateToProps, { getProfileThunk }),
    withRouter,
    //WithAuthRedirect
)(ProfileContainer)