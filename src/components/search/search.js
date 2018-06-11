import React, { Component } from 'react'
import axios from '../../axios_data'
import { connect } from 'react-redux'
import * as actions from '../../store/action/index'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/fontawesome-free-solid'

import Input from '../input/input'
import Backdrops from '../backdrops/backdrops'
import classes from './search.css'

class Search extends Component{
    state = {
        searchValue: '',
        currencyObjectForSearch: this.props.currencyData,
        results: {},
        showSearch: false,
    }

    searchChangeHandler = (event) => {
        const value = event.target.value
        this.setState({
            searchValue: value
        })
        let results = {}
        console.log(this.props.currencyData)
        Object.keys(this.props.currencyData).map((key) => {
            if(key.toLowerCase().match(value.toLowerCase()) !== null){
                const item = {[key]:this.props.currencyData[key]}
                results = {
                    ...results,
                    ...item
                }
            }else if(this.props.currencyData[key].code.toLowerCase().match(value.toLowerCase()) !== null){
                const item = {[key]:this.props.currencyData[key]}
                results = {
                    ...results,
                    ...item
                }
            }
        })
        console.log(results)
        this.setState({
            results: results,
        })
    }

    showSearchHandler = () => {
        this.setState({
            showSearch: ! this.state.showSearch
        })
    }

    addStared = (code) => {
        let currencyStared = this.props.currencyStared.slice()
        currencyStared.push(code)
        this.props.changeStared(currencyStared)
        this.setState({
            showSearch: false,
            searchValue: '',
            results: {}
        })
        if(this.props.signin === true){
            this.changeStared(currencyStared)
        }
    }

    changeStared = (currencyStared) => {
        axios.post('/api/changeStared',{
            currencyStared: currencyStared,
            email: this.props.userData.email
        }).then((res) => {
            this.props.signinSuccessfully(res.data)
        })
    }

    render(){
        const resultsArrayDisplay = Object.keys(this.state.results).map((key) => {
            return(
                <div key={key}
                    className={classes.resultItem}>
                    <div className={classes.currency}>
                        <p className={classes.currencyName}>
                            {key}
                        </p>
                        <p className={classes.currencyCode}>
                            {this.state.results[key].code}
                        </p>
                    </div>
                    <div className={classes.rate}>
                        <p>{this.state.results[key].rate}</p>
                        <div 
                            id='addStared'
                            onClick={() => this.addStared(this.state.results[key].code)}
                            className={classes.plusIcon}>
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div>
                <div 
                    id="searchIcon"
                    onClick={this.showSearchHandler}
                    className={classes.searchIcon}
                    style={this.state.showSearch?
                        {color:'#f5eed5'}
                        :null}>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                {this.state.showSearch?
                    <div>
                        <div className={classes.searchField}>
                            <Input 
                                onChange={(event) => this.searchChangeHandler(event)}
                                value={this.state.searchValue}
                                maxlength='30' />
                        </div>
                        <div className={classes.searchResults}>
                            {resultsArrayDisplay}
                        </div>
                        <div className={classes.backdrops}>
                            <Backdrops
                                showBackdrops={true} />
                        </div>
                    </div>
                    :null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        signin: state.signin,
        userData: state.userData,
        currencyData: state.currencyData,
        currencyStared: state.currencyStared,
    }
}

const mapActionsToProps = dispatch => {
    return{
        changeStared: (currencyStared) => dispatch(actions.changeStared(currencyStared)),
        signinSuccessfully: (userData) => dispatch(actions.signinSuccessfully(userData))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Search);