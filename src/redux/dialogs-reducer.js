const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

let initialState = {
    dialogs: [
        { id: 1, name: 'John', message: 'Hi !' },
        { id: 2, name: 'Alex', message: 'How are you' },
        { id: 3, name: 'Michael', message: 'What about coffe ?' },
        { id: 4, name: 'Karlos', message: 'How is your day ?' },
        { id: 5, name: 'Ilya', message: 'I wan to tell you about my pet project' },
        { id: 6, name: 'Dyma', message: 'Pleace , call me back , i have serious conversation' }
    ],

    placeholder: 'Send a message'

}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE: 
            let newDialog = {
                id: 10,
                message: state.placeholder
            }
            return {
                ...state,
                dialogs:[...state.dialogs, newDialog],
                placeholder: ''
            }
            case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                placeholder:action.newMessageTxt
            }
        default:
            return state

    }

}

export const addMessageCreator = () => ({ type: ADD_MESSAGE })

export const updateNewMessageTextCreator = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newMessageTxt: text })

export default dialogsReducer
