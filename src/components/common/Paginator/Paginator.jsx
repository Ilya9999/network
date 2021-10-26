import React, { useState } from 'react'
import style from './Paginator.module.css'

let Paginator = ({totalItemsCount,pageSize,currentPage,onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={style.pіaginator}>
            {pages.map(p => {
                return <span className={currentPage === p && style.selectedPage}
                    onClick={() => { onPageChanged(p) }}>{p}</span>
            })}

        </div>
    )
}

export default Paginator