import React from 'react';
import Header from './Header';
import { setAuthUserData, authUser } from '../../redux/auth-reducer '
import { connect } from 'react-redux';
import { authAPI } from '../../api/api'

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.authUser()
        // authAPI.getAuth().then(data => {
        //         if (data.resultCode === 0) {
        //             let {id, email, login} = data.data
        //             this.props.setAuthUserData(id, email, login)
        //         }
        //     })
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    login:state.auth.login,

})

export default connect(mapStateToProps, {setAuthUserData, authUser}) (HeaderContainer)