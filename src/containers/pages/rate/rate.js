import React, { Component } from 'react'
import axios from '../../../axios_data'
import dateFns from 'date-fns'
import { connect } from 'react-redux'
import * as actions from '../../../store/action/index'


import TopBar from '../../../components/topBar/topBar'
import DatePicker from '../../../components/datePicker/datePicker'
import ExchangeList from '../../../components/exchangeList/exchangeList'
import classes from './rate.css'

class Rate extends Component{
    state={
        currencyShowed:[
            'CNY',
            'JPY',
            'EUR',
        ],
        exchangeRate:{

        },
        currencyAll:{

        },
        selectedDate: new Date()
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        const date = new URLSearchParams(paramsGet).get('date')
        console.log(date)
        if(date !== undefined && date !== null){
            this.setState({
                selectedDate: dateFns.parse(date)
            })
            console.log(date)
            this.getHistoryRate(date)
        }else{
            this.getCurrentRate()
        }
    }

    getCurrentRate = () => {
        axios.post('/api/getCurrentExchangeRate')
            .then((res) => {
                const exchangeRate = res.data
                this.setState({
                    exchangeRate: exchangeRate
                })
                axios.post('/api/getCurrency')
                    .then((res) => {
                        const currencyAll = res.data
                        this.setState({
                            currencyAll: currencyAll
                        })
                    })
            })
    }

    getHistoryRate = (date) => {
        console.log('what')
        console.log(date)
        axios.post('/api/getHistoryExchangeRate',
            {
                date: date
            })
            .then((res) => {
                const exchangeRate = res.data
                this.setState({
                    exchangeRate: exchangeRate
                })
                axios.post('/api/getCurrency')
                    .then((res) => {
                        const currencyAll = res.data
                        this.setState({
                            currencyAll: currencyAll
                        })
                    })
            })
    }

    deleteCurrency = (currencyCode) => {
        const currencyShowed = this.state.currencyShowed
        let newCurrencyArray = []
        for(let item of currencyShowed){
            if(item !== currencyCode){
                newCurrencyArray.push(item)
            }
        }
        this.setState({
            currencyShowed: newCurrencyArray
        })
    }

    render(){
        const rateTable = this.state.currencyShowed.map((currency) => {
            const exchangeRate = this.state.exchangeRate[currency]
            const currencyName = this.state.currencyAll[currency]
            return {
                code: currency,
                name: currencyName,
                rate: exchangeRate
            }
        })

        const rateTableDisplay = rateTable.map((currency) => { 
            return(
                <ExchangeList
                    key={currency.code}
                    currencyName={currency.name}
                    currencyCode={currency.code}
                    exchangeRate={currency.rate}
                    deleteItem={() => this.deleteCurrency(currency.code)} />
            )
        })

        return(
            <div>
                <TopBar pageTitle='Exchange Rate' >
                    <DatePicker selectedDate={this.state.selectedDate}/>
                </TopBar>
                <div className={classes.rateContent}>
                    {rateTableDisplay}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        login: state.login,
        userData: state.userData
    }
}

const mapActionsToProps = dispatch => {
    return{
        loginSuccessfully: (userData) => dispatch(actions.loginSuccessfully(userData))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Rate);