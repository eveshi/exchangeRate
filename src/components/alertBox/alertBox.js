import React from 'react';
import Backdrops from '../backdrops/backdrops';
import classes from './alertBox.css';

const alertBox = (props) => {
    return(
        <div className={classes.alert}>
            <div className={classes.alertBox}>
                <p>{props.alertContent}</p>
                <p 
                    className={classes.alertButton} 
                    onClick={props.onClick}>
                    {props.confirm}
                </p>
            </div>
            <Backdrops show={true} />
        </div>
    )
}

export default alertBox;