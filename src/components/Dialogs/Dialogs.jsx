import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogsItem'


const Dialogs = (props) => {
    
    let diaologsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} message={d.message}/>)

    let newDialog = React.createRef()

    let addMessage = () => {
        props.addMessage()
    }

    let onMessageChange = () => {
         let text = newDialog.current.value
        props.updateNewMessageText(text)
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {diaologsElements}
            </div>
            <div>
                <textarea onChange={onMessageChange} 
                ref={newDialog}
                value={props.placeholder} /> 
                <div>
                    <button onClick={addMessage}>Add Message</button>
                </div>
            </div>
        </div>


    )
}

export default Dialogs