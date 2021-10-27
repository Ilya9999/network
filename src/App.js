import React from 'react'
import './App.css'
import Navbar from './components/NavBar/Navbar'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { Route, withRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'
import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import { initializeApp } from './redux/app-reducer '
import { connect } from 'react-redux'
import Prelaoder from './components/Preloader/Preloader'
import { compose } from 'redux'
import store from './redux/redux-store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {WithSuspense} from './hoc/WithSuspense'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Prelaoder />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <div className='sidebar'>
          <Navbar />
          {/* <Sidebar /> */}
        </div>
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={WithSuspense(DialogsContainer)} />

          <Route path='/profile/:userId?' render={WithSuspense(ProfileContainer)}/>

          <Route path='/users' render={() =>
            <UsersContainer />} />

          <Route path='/login' render={() =>
            <Login />} />

          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/settings' render={() => <Settings />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)


const SamuraiJSApp = (props) => {
  return <Provider localStore={store} store={store} >
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>
}

export default SamuraiJSApp