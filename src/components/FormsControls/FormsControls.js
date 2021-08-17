import React from 'react'
import styles from './FormsControls.module.css'
import { Field, reduxForm } from 'redux-form'

const FormControl = ({ input, meta:{touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props} ><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
    return <FormControl {...props} ><input {...input} {...restProps} /></FormControl>
}

// Как решить проблему оставшегося дублирования кода при помощи замыкания 
// const Element = Element => ({ input, meta, ...props }) => {
//     const hasError = meta.touched && meta.error;
//     return (
//       <div className={ s.formControl + " " + (hasError ? s.error : "") }>
//         <Element {...input} {...props} />
//         { hasError && <span> { meta.error } </span> }
//       </div>
//     );
//   };

//   А потом просто его импортим в компоненту формы, вызываем как

//   const Textarea = Element("textarea");

//   и передаем

//   <Field component={Textarea} .../>

//   Все работает!)

export const createField = (placeholder, name, validators, component, props = {}, text = "") => (
    <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>
)