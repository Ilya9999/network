import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem'
import { Redirect } from 'react-router'
import { Field, reduxForm, InjectedFormProps} from 'redux-form'
import MessageItem from './MessageItem/MessageItem'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { Textarea } from '../FormsControls/FormsControls'
import { InitialStateType } from '../../redux/dialogs-reducer'
import { createField} from '../FormsControls/FormsControls'

type PropsType = {
    // dialogs: InitialStateType
    // messages: InitialStateType
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

type NewMessageFormValuesType = { 
    newMessageBody:string
}

// Exrtact method allowed to you choosing from keyses only string type keys.
type NewMessageValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let diaologsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />)
    let messageElement = state.messages.map(m => <MessageItem message={m.message} key={m.id} />)

    let newDialog = React.createRef()

    let addNewMessage = (values: NewMessageFormValuesType) => {
      props.sendMessage(values.newMessageBody)
    }

    return (
        <div>
            <div className={style.wrapDialogs}>
                <div className={style.dialogsItems}>
                    {diaologsElements}
                </div>
                <div className={style.messageItems}>
                    {messageElement}
                </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>


    )
}

// ============================================================================ //
type AddMessageFormPropsTypes = {}

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, AddMessageFormPropsTypes> & AddMessageFormPropsTypes> 
    = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>

                {createField<NewMessageValuesTypeKeys>('Send Message', 'newMessageBody', [required, maxLength50], Textarea)}

                {/* <Field component={Textarea} name={'newMessageBody'} 
                placeholder={'Send Message'}
                validate={[required, maxLength50]} /> */}

                <div>
                    <button>Add Message</button>
                </div>
            </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType> ({form:'dialogAddMessageForm'}) (AddMessageForm)

export default Dialogs