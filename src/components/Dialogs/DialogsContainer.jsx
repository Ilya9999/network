import React from 'react';
import Dialogs from './Dialogs';
import { addMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';

const DialogsContainer = (props) => {

    let state = props.store.getState()

    let addMessage = () => {
        props.store.dispatch(addMessageCreator())
    }

    let onMessageChange = (text) => {
        let action = updateNewMessageTextCreator(text)
        props.store.dispatch(action)
        // let text = newDialog.current.value
        // props.store.dispatch(updateNewMessageTextCreator(text))


    }

    return (

        <Dialogs updateNewMessageText={onMessageChange}
            addMessage={addMessage} dialogs={state.dialogsPage.dialogs} placeholder={state.dialogsPage.placeholder}
        />

    )
}

export default DialogsContainer