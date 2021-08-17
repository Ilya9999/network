import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import styles from '../FormsControls/FormsControls.module.css'
import { login } from '../../redux/auth-reducer '
import { Redirect } from 'react-router'
import { createField } from '../FormsControls/FormsControls'

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, { type: 'password' })}
            {createField(null, 'rememberMe', null, Input, { type: 'checkbox' }, 'remember me')}
            {/* <Field type="text" placeholder={'Email'} name={'email'}
                    validate={[required]}
                    component={Input} /> */}
            {/* <div>
                <Field type="text" placeholder={'Password'} name={'password'} type={'password'}
                    validate={[required]}
                    component={Input} />
            </div>
            <div className={styles.rememberCheck}>
                <Field type="checkbox" component={Input} name={'rememberMe'} /> remember me
            </div> */}

            {error &&
                <div className={styles.formSummaryError}>
                    {error}
                </div>
            }

            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)