import React from 'react';
import Header from './Header';
import { setAuthUserData, authUser } from '../../redux/auth-reducer '
import { connect } from 'react-redux';


class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.authUser()
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