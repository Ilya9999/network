import React from 'react'
import style from '../Preloader/Preloader.module.css'

const Prelaoder = () => {
    return (
        <div className={style.wrappLoader}>
            <div className={style.ldsHourglass}></div>
        </div>
    )
    
}

export default Prelaoder