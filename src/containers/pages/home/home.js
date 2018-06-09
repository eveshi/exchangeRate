import React, { Component } from 'react'
import TopBar from '../../../components/topBar/topBar'
import DatePicker from '../../../components/datePicker/datePicker'
import classes from './home.css'

class Home extends Component{
    render(){
        return(
            <div>
                <TopBar pageTitle='Exchange Rate' >
                    <DatePicker selectedDate={new Date()}/>
                </TopBar>
            </div>
        )
    }
}

export default Home