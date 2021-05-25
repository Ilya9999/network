import dialogsReducer from './dialogs-reducer'
import profileReducer from './profile-reducer'
import sidebarReducer from './sidebar-reducer'

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likesCount: 12 },
                { id: 2, message: 'Its my first post', likesCount: 11 }
            ],

            newPostText: 'Please write the message'
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'John', message: 'Hi !' },
                { id: 2, name: 'Alex', message: 'How are you' },
                { id: 3, name: 'Michael', message: 'What about coffe ?' },
                { id: 4, name: 'Karlos', message: 'How is your day ?' },
                { id: 5, name: 'Ilya', message: 'I wan to tell you about my pet project' },
                { id: 6, name: 'Dyma', message: 'Pleace , call me back , i have serious conversation' }
            ],

            placeholder: 'Send a message'

        },

        sidebar: {
            friends: [
                { id: 1, person: 'Garry' },
                { id: 2, person: 'John' },
                { id: 3, person: 'Barry' }
            ]
        }
    },

    _callSubscriber() {
        console.log('State changed')
    },

    getState() {
        return this._state
    },

    //observer pattern , по этому же паттрну работает addEventListener
    subscribe(observer) {
        this._callSubscriber = observer
    },

    //Мы отслеживаем действия которые происходят в UI при помощи метода dispatch. Он Вызывает необходимые reducer-ы и они изменяют _state
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._state.users = UsersReducer(this._state.users, action)
        //Уведомляем всех подписчиков о изменениях в _state
        this._callSubscriber(this._state)
    }
}

export default store
window.store = store