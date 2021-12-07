import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import UsersReducer from "./users-reducer"
import AuthReducer from './auth-reducer '
import AppReducer from './app-reducer '
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { type } from 'os'

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: UsersReducer,
    auth: AuthReducer,
    form: formReducer,
    app: AppReducer
})

type RootReducerType = typeof reducers // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store

export default store