import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/NavBar/Navbar';
import Profile from './components/Profile/Profile';
// import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import DialogsContainer from './components/Dialogs/DialogsContainer';

const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <div className='sidebar'>
      <Navbar />
      <Sidebar state={props.state.sidebar} dispatch={props.dispatch}/>
      </div>
      <div className='app-wrapper-content'>
      <Route path='/dialogs' render={() =>
          <DialogsContainer store={props.store}/> 
          } />
        {/* <Route path='/dialogs' render={() =>
          <Dialogs store={props.store}
            state={props.state.dialogsPage}
            dispatch={props.dispatch}
            placeholder={props.placeholder}
          /> 
          } /> */}

        <Route path='/profile' render={() =>
          <Profile store={props.store}  />} />
          
        <Route path='/news' render={() => <News />} />
        <Route path='/music' render={() => <Music />} />
        <Route path='/settings' render={() => <Settings />} />
      </div>
    </div>
  )
}

export default App
