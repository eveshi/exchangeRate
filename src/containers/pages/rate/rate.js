import React, { Component } from 'react'
import axios from '../../../axios_data'
import dateFns from 'date-fns'
import { connect } from 'react-redux'
import * as actions from '../../../store/action/index'


import TopBar from '../../../components/topBar/topBar'
import SubTitle from '../../../components/subTitle/subTitle'
import Search from '../../../components/search/search'
import DatePicker from '../../../components/datePicker/datePicker'
import ExchangeList from '../../../components/exchangeList/exchangeList'
import classes from './rate.css'

class Rate extends Component{
    state={
        currencyStared: this.props.currencyStared,
        exchangeRate:{

        },
        currencyName:{

        },
        selectedDate: new Date()
    }

    componentWillMount(){
        const paramsGet = this.props.location.search
        const date = new URLSearchParams(paramsGet).get('date')
        if(date !== undefined && date !== null){
            this.setState({
                selectedDate: dateFns.parse(date)
            })
            this.getHistoryRate(date)
        }else{
            this.getCurrentRate()
        }
    }

    shouldComponentUpdate(nextProps){
        if(this.props.location.search !== nextProps.location.search){
            const paramsGet = nextProps.location.search
            const date = new URLSearchParams(paramsGet).get('date')
            if(date !== undefined && date !== null){
                this.setState({
                    selectedDate: dateFns.parse(date)
                })
                this.getHistoryRate(date)
            }else{
                this.getCurrentRate()
            }
        }
        if(this.props.currencyStared !== nextProps.currencyStared){
            this.setState({
                currencyStared: nextProps.currencyStared
            })
        }
        return true
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
                        const currencyName = res.data
                        this.setState({
                            currencyName: currencyName
                        })
                        this.sortCurrencyDataForRedux()
                    })
            })
    }

    getHistoryRate = (date) => {
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
                        const currencyName = res.data
                        this.setState({
                            currencyName: currencyName
                        })
                        this.sortCurrencyDataForRedux()
                    })
            })
    }

    sortCurrencyDataForRedux = () => {
        let sortedData = {}
        Object.keys(this.state.exchangeRate).map((key) => {
            const currencyName = this.state.currencyName[key]
            const item = {
                [currencyName]:{
                    code: key,
                    rate: this.state.exchangeRate[key]
                }
            }
            sortedData = {
                ...sortedData,
                ...item
            }
        })
        this.props.loadData(sortedData)
    }

    deleteCurrency = (currencyCode) => {
        const currencyStared = this.state.currencyStared
        let newCurrencyArray = []
        for(let item of currencyStared){
            if(item !== currencyCode){
                newCurrencyArray.push(item)
            }
        }
        this.setState({
            currencyStared: newCurrencyArray
        })
        this.props.changeStared(newCurrencyArray)
        if(this.props.signin === true){
            this.changeStared(newCurrencyArray)
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
        const rateTable = this.state.currencyStared.map((currency) => {
            const exchangeRate = this.state.exchangeRate[currency]
            const currencyName = this.state.currencyName[currency]
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
                <Search />
                <div className={classes.rateContent}>
                    <SubTitle
                        firstContent='Base'
                        secondContent='US Doller' />
                    {rateTableDisplay}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        signin: state.signin,
        userData: state.userData,
        currencyData: state.currencyData,
        currencyStared: state.currencyStared
    }
}

const mapActionsToProps = dispatch => {
    return{
        loadData: (currencyData) => dispatch(actions.loadData(currencyData)),
        changeStared: (currencyStared) => dispatch(actions.changeStared(currencyStared)),
        signinSuccessfully: (userData) => dispatch(actions.signinSuccessfully(userData))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Rate);