import React from 'react';
import Dialogs from './Dialogs';
import { addMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
      placeholder:state.dialogsPage.placeholder
    }
}

let mapDispatchToProps = (dispatch) => {
     return {

        addMessage: () => {
            dispatch(addMessageCreator())
        },

        updateNewMessageText: (text) => {
            let action = updateNewMessageTextCreator(text)
            dispatch(action)
        }
    }
}

const DialogsContainer = connect(mapStateToProps,mapDispatchToProps) (Dialogs)

export default DialogsContainer