import React from 'react'
import classes from './button.css'
import classnames from classnames;

classnames({
    'disabled': props.disabled
})

const button = (props) => {
    return (
        <button 
            className={`${props.className} ${classes.button}`} 
            onClick={props.onClick} 
            disabled={props.disabled}
            style={props.style}>
            {props.children}
        </button>
    )
};

export default button