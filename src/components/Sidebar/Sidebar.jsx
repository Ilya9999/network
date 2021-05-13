import React from 'react'
import style from './Sidebar.module.css'
import SingleFriend from './SingleFriend/SingleFriend'


const Sidebar = (props) => {
    let friend = props.state.friends.map(f => <SingleFriend person={f.person} foto={f.foto} />)
    return (
        <div>
            <h3 className={style.heading}>My Friends</h3>
            <ul className={style.friendsList}>
                <li>
                    {friend}
                </li>
            </ul>
        </div>
    )
}

export default Sidebar