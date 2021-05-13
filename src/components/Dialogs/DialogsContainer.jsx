import React from 'react';
import Dialogs from './Dialogs';
import { addMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';

const DialogsContainer = (props) => {

    let state = props.state.dialogsPage.dialogs

    let addMessage = () => {
        props.store.dispatch(addMessageCreator())
    }

    let onMessageChange = (text) => {
        // let text = newDialog.current.value
        props.store.dispatch(updateNewMessageTextCreator(text))

    }

    return (

        <Dialogs updateNewMessageText={onMessageChange} addMessage={addMessage}
            dialogs={state}
        />

    )
}

export default DialogsContainer