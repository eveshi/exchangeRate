import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHome, faUserAstronaut } from '@fortawesome/fontawesome-free-solid'
import classes from './toolbar.css'

class Toolbar extends Component{
    render(){
        let userUrl = ''
        if(this.props.signin === true){
            userUrl = '/user'
        }else{
            userUrl = '/register'
        }

        return(
            <div className={classes.toolbar}>
                <Link to='/'>
                    <FontAwesomeIcon icon={faHome} className={classes.icon} />
                </Link>
                <Link to={userUrl}>
                    <FontAwesomeIcon icon={faUserAstronaut} className={classes.icon} />
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        signin: state.signin,
        userData: state.userData,
    }
}

export default connect(mapStateToProps)(Toolbar)