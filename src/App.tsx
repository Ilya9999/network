import React, { ComponentType } from 'react'
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
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { WithSuspense } from './hoc/WithSuspense'
import Error from './components/common/Paginator/Error'
import { AppStateType } from './redux/redux-store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

type MapPropstype = ReturnType<typeof mapStateToProps>
type DispatchPropstype = {
  initializeApp: () => void
}

class App extends React.Component<MapPropstype & DispatchPropstype> {

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
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'/profile'} />} />

            <Route path='/dialogs' render={WithSuspense(DialogsContainer)} />

            <Route path='/profile/:userId?' render={WithSuspense(ProfileContainer)} />

            <Route path='/users' render={() =>
              <UsersContainer pageTitle={"Самураи"}/>} />

            <Route path='/login' render={() =>
              <Login />} />

            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/settings' render={() => <Settings />} />
            <Route exact path='*' render={() => <Error />} />
          </Switch>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)


const SamuraiJSApp: React.FC = () => {
  return <Provider store={store} >
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>
}

export default SamuraiJSApp