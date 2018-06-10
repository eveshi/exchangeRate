import React from 'react'
import classes from './input.css'

const input = (props) => {
    return(
        <div>
            <input
                placeholder = {props.placeholder}
                value={props.value}
                onChange={props.onChange}
                style={props.isUpToStandard===false?
                    {borderBottom:'2px solid #D30208',color:'red'}:{}}
                maxLength={props.maxlength?
                    props.maxlength
                    :'4'}
                type={props.type} />   
            {props.isUpToStandard===false?
                <p className={classes.alert}>{props.alert}</p>:
                null} 
        </div>
    )
}

export default input