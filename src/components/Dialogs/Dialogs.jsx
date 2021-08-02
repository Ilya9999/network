import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem'
import { Redirect } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import MessageItem from './MessageItem/MessageItem'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { Textarea } from '../FormsControls/FormsControls'



const Dialogs = (props) => {
    
    let diaologsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />)
    let messageElement = props.messages.map(m => <MessageItem message={m.message} key={m.id} />)

    let newDialog = React.createRef()

    let addNewMessage = (values) => {
      props.addMessage(values.newMessageBody)
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

const maxLength10 = maxLengthCreator(10)

const AddMessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>

                <Field component={Textarea} name={'newMessageBody'} 
                placeholder={'Send Message'}
                validate={[required, maxLength10]} />

                <div>
                    <button>Add Message</button>
                </div>
            </form>
    )
}

const AddMessageFormRedux = reduxForm ({form:'dialogAddMessageForm'}) (AddMessageForm)

export default Dialogs