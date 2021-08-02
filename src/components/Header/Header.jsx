import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.css'

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src='https://img.icons8.com/clouds/2x/duolingo-logo.png' />
            <div className={style.loginBlock}>
                {props.isAuth 
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>

    )
}

export default Header;