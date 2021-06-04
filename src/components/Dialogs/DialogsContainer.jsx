import React from 'react';
import Dialogs from './Dialogs';
import { addMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect'
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        placeholder:state.dialogsPage.placeholder,
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

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    WithAuthRedirect
    
) (Dialogs)