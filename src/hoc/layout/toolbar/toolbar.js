import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHome, faUserAstronaut } from '@fortawesome/fontawesome-free-solid'
import classes from './toolbar.css'

class Toolbar extends Component{
    render(){
        return(
            <div className={classes.toolbar}>
                <FontAwesomeIcon icon={faHome} className={classes.icon} />
                <FontAwesomeIcon icon={faUserAstronaut} className={classes.icon} />
            </div>
        )
    }
}

export default Toolbar