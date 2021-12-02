import { type } from 'os'

const SEND_MESSAGE = 'SEND_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE'

type DiaologType = {
    id:number | null,
    name: string | null
}

type MessagesType = {
    id:number | null,
    message: string | null
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrew' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Viktor' },
        { id: 6, name: 'Valera' }
    ] as Array<DiaologType> ,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'I did it !!!!' }

    ] as Array<MessagesType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            let newUser = 'New User'
            return {
                ...state,
                dialogs: [...state.dialogs, { id: 6, name: newUser }],
                messages: [...state.messages, { id: 6, message: body }]
            };
        case DELETE_MESSAGE:
            return { ...state, messages: state.messages.filter(m => m.id != action.messagegId) }

        default:
            return state;
    }
}

type sendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({ type: SEND_MESSAGE, newMessageBody })

type deleteMessageType = {
    type: typeof DELETE_MESSAGE,
    messagegId: number
}

export const deleteMessage = (messagegId: number): deleteMessageType => ({ type: DELETE_MESSAGE, messagegId })


export default dialogsReducer;

