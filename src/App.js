import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';


const App = (props) => {
  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <div className='sidebar'>
        <Navbar />
        {/* <Sidebar /> */}
      </div>
      <div className='app-wrapper-content'>
        <Route path='/dialogs' render={() =>
          <DialogsContainer />
        } />
        <Route path='/profile/:userId?' render={() =>
          <ProfileContainer />} />

        <Route path='/users' render={() =>
          <UsersContainer />} />

        <Route path='/news' render={() => <News />} />
        <Route path='/music' render={() => <Music />} />
        <Route path='/settings' render={() => <Settings />} />
      </div>
    </div>
  )
}

export default App
