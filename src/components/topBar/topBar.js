import React from 'react'
import classes from './topBar.css'

const topBar = (props) => {
    return(
        <div className={classes.topBar}>
            <div className={classes.pageTitle}>
                <div>{props.pageTitle}</div>
            </div>
            <div className={classes.childrenComponent}>
                {props.children}
            </div>
        </div>
    )
}

export default topBar