import { applyMiddleware, combineReducers, createStore } from "redux"
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import UsersReducer from "./users-reducer"
import AuthReducer from "./auth-reducer "
import AppReducer from './app-reducer '
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: UsersReducer,
    auth:AuthReducer,
    form: formReducer,
    app: AppReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store