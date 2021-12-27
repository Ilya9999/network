import { type } from 'os'
import { BaseThunkType, InferActionsTypes } from './redux-store';

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

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: SEND_MESSAGE, newMessageBody } as const),
    deleteMessage: (messagegId: number) => ({ type: DELETE_MESSAGE, messagegId } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
//функция InferActionsTypes автоматически выводит типы экшинов которые есть внутри редьюсера
type ActionsType = InferActionsTypes<typeof actions>


