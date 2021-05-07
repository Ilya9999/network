const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'

const dialogsReducer = (state, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newDialog = {
                id: 10,
                message: state.placeholder
            }
            state.dialogs.push(newDialog)
            state.placeholder = ''
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.placeholder = action.newMessageTxt
            return state

        default:
            return state

    }

}

export const addMessageCreator = () => ({ type: ADD_MESSAGE })

export const updateNewMessageTextCreator = (text) =>
    ({ type: UPDATE_NEW_MESSAGE_TEXT, newMessageTxt: text })

export default dialogsReducer