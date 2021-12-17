import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Input } from '../FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import styles from '../FormsControls/FormsControls.module.css'
import { login } from '../../redux/auth-reducer '
import { Redirect } from 'react-router'
import { createField} from '../FormsControls/FormsControls'
import { type } from 'os'
import { AppStateType } from '../../redux/redux-store'

type LoginFormOwnProps = {
    captchaUrl:string | null
}

type MapStateToPropsType = {
    captchaUrl:string | null
    isAuth:boolean
}

type MapDispatchToPropsType = {
    login: (email: string, password:string, rememberMe: boolean, captcha: any) => void
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
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

type LoginFormValuesType = { 
    email:string
    password:string
    rememberMe:boolean
    captcha: string
}


type LoginFormValuesTypeKeys = keyof LoginFormValuesType

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps > 
    = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
            <div className={styles.formCheck}>
                {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [] , Input, { type: 'checkbox' }, 'remember me')}
            </div>

            {captchaUrl && <img src={captchaUrl}/> }
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Enter symbols from img', 'captcha', [required], Input, {}) }

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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl:state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login)