import React from 'react'
import classes from './subTitle.css'

const subTitle = (props) => {
    return(
        <div className={classes.subTitle}>
            <div className={classes.firstContent}>
                <p>{props.firstContent}</p>
                <div className={classes.background}></div>
            </div>
            <p className={classes.secondContent}>
                {props.secondContent}
            </p>
        </div>
    )
}

export default subTitle