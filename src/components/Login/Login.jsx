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
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, { type: 'password' })}
            <div className={styles.formCheck}>
                {createField(null, 'rememberMe', null, Input, { type: 'checkbox' }, 'remember me')}
            </div>
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

            {captchaUrl && <img src={captchaUrl}/> }
            {captchaUrl && createField('Enter symbols from img', 'captcha', [required], Input, {}) }

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
    captchaUrl:state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)