import dialogsReducer from './dialogs-reducer'
import { sendMessageCreator, deleteMessage } from './dialogs-reducer'

let state = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'I did it !!!!'}

    ]
}

test('lenght of arrays message and dialogs should be increase', () => {
    //1. test data
    let action = sendMessageCreator('I`am a new message !')
    //2. action
    let newState = dialogsReducer(state, action)
    //3. expectation
    expect(newState.messages.length && newState.dialogs.length).toBe(7)
});

test('affter deleting messages lenght of messages array should be decrement', () => {
    //1. test data
    let action = deleteMessage(1)
    //2. action
    let newState = dialogsReducer(state, action)

    //3. expectation
    expect(newState.messages.length).toBe(5)

});
