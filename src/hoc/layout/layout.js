import React from 'react'
import Toolbar from './toolbar/toolbar'
import classes from './layout.css'

const layout = (props) => {
    return(
        <div className={classes.layout}>
            {props.children}
            <Toolbar />
        </div>
    )
}

export default layout