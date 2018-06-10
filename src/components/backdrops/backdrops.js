import React from 'react'
import classes from './backdrops.css'

const backdrops = (props) => {
    return (       
        <div 
            className={classes.backdrops}
            style={props.showBackdrops?{}:{display:'none'}}
            onClick={props.onClick}>
            {props.children}        
        </div>)
}

export default backdrops