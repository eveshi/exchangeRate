import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import classes from './search.css'

class Search extends Component{


    render(){
        return(
            <div>
                <FontAwesomeIcon icon='search' />
            </div>
        )
    }
}

export default Search