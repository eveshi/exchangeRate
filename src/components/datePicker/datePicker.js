import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dateFns from 'date-fns'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/fontawesome-free-solid'

import Input from '../input/input'
import Button from '../button/button'
import Backdrops from '../backdrops/backdrops'
import classes from './datePicker.css'

const INITIAL_STATE = {
    currentDate: '',
    selectedDate: '',
    inputForm:{
        year: {
            placeholder: 'YYYY',
            value: '',
            maxlength: '4',
            isUpToStandard: null,
            alert: 'invalid year',
        },
        month: {
            placeholder: 'MM',
            value: '',
            maxlength: '2',
            isUpToStandard: null,
            alert: 'invalid month',
        },
        day: {
            placeholder: 'DD',
            value: '',
            maxlength: '2',
            isUpToStandard: null,
            alert: 'invalid date',
        },
    },
    ifSubmitDisabled: 'disabled',
    newSelectedDate: '',
    showPicker: false,
};

class DatePicker extends Component{
    state=INITIAL_STATE

    componentWillMount(){
        this.setState({
            currentDate: new Date(),
            selectedDate: dateFns.format(this.props.selectedDate, 'YYYY-MM-DD'),
        })
    }
    
    componentDidUpdate() {
        this.refreshPage();
    }

    shouldComponentUpdate(nextProps){
        if(this.props.selectedDate !== nextProps.selectedDate){
            this.setState({
                selectedDate: dateFns.format(nextProps.selectedDate, 'YYYY-MM-DD'),
            })
        }
        return true
    }

    onClick() {
        closePicker()；
        this.props.onClick();
    }

    inputChangeHandler = (key) => (event) => {
        const value = event.target.value
        switch(key){
            case 'year':
                if(value < 1999 || value > dateFns.getYear(new Date())){
                    this.setState({
                        inputForm:{
                            ...this.state.inputForm,
                            year:{
                                ...this.state.inputForm.year,
                                value: value,
                                isUpToStandard: false,
                            }
                        },
                        ifSubmitDisabled: 'disabled',
                    })
                }else{
                    this.setState({
                        inputForm:{
                            ...this.state.inputForm,
                            year:{
                                ...this.state.inputForm.year,
                                value: value,
                                isUpToStandard: true,
                            }
                        }
                    })
                };
                break;
            case 'month':
                if(value < 1
                    || value > 12
                    || (this.state.inputForm.year.value === dateFns.getYear(new Date())
                        && value > dateFns.getMonth(new Date())+1)){
                    this.setState({
                        inputForm:{
                            ...this.state.inputForm,
                            month:{
                                ...this.state.inputForm.month,
                                value: value,
                                isUpToStandard: false,
                            }
                        },
                        ifSubmitDisabled: 'disabled',
                    })
                }else{
                    this.setState({
                        inputForm:{
                            ...this.state.inputForm,
                            month:{
                                ...this.state.inputForm.month,
                                value: value,
                                isUpToStandard: true,
                            }
                        }
                    })
                };
                break;
            case 'day':
                if(dateFns.isValid(new Date(this.state.inputForm.year.value, 
                                this.state.inputForm.month.value-1,
                                this.state.inputForm.day.value))
                    && value < dateFns.getDaysInMonth(
                            new Date(this.state.inputForm.year.value, 
                            this.state.inputForm.month.value-1))+1
                    && value > 0){
                    this.setState({
                        inputForm:{
                            ...this.state.inputForm,
                            day:{
                                ...this.state.inputForm.day,
                                value: value,
                                isUpToStandard: true,
                            }
                        },
                        newSelectedDate: dateFns.format(new Date(this.state.inputForm.year.value, 
                        this.state.inputForm.month.value-1,
                        value), 'YYYY-MM-DD'),
                        ifSubmitDisabled: null
                    })
                }else{
                    this.setState({
                        inputForm:{
                            ...this.state.inputForm,
                            day:{
                                ...this.state.inputForm.day,
                                value: value,
                                isUpToStandard: false,
                            }
                        },
                        ifSubmitDisabled: 'disabled',
                    })
                };
                break;
            default:
                break;
        }
    }

    useCurrentDate = () => {
        this.setState({
            inputForm:{
                ...this.state.inputForm,
                year:{
                    ...this.state.inputForm.year,
                    value: dateFns.getYear(new Date()),
                    isUpToStandard: true
                },
                month:{
                    ...this.state.inputForm.month,
                    value: dateFns.getMonth(new Date())+1,
                    isUpToStandard: true
                },
                day:{
                    ...this.state.inputForm.day,
                    value: dateFns.getDate(new Date()),
                    isUpToStandard: true
                }
            },
            newSelectedDate: dateFns.format(new Date(), 'YYYY-MM-DD'),
            ifSubmitDisabled: null,
        })
    }

    changeShowPicker = () => {
        this.setState({
            showPicker: ! this.state.showPicker
        })
    }

    hidePicker = () => {
        this.setState({
            showPicker: false
        })
    }

    refreshPage = () => {
        this.setState({
            inputForm:{
                year: {
                    placeholder: 'YYYY',
                    value: '',
                    maxlength: '4',
                    isUpToStandard: null,
                    alert: 'invalid year',
                },
                month: {
                    placeholder: 'MM',
                    value: '',
                    maxlength: '2',
                    isUpToStandard: null,
                    alert: 'invalid month',
                },
                day: {
                    placeholder: 'DD',
                    value: '',
                    maxlength: '2',
                    isUpToStandard: null,
                    alert: 'invalid date',
                },
            },
            ifSubmitDisabled: 'disabled',
            newSelectedDate: '',
            showPicker: false,
        })
    }

    render(){
        const inputForm = Object.keys(this.state.inputForm).map((key) => {
            return(
                <Input
                    key = {key}
                    placeholder = {this.state.inputForm[key].placeholder}
                    value={this.state.inputForm[key].value}
                    maxlength={this.state.inputForm[key].maxlength}
                    isUpToStandard={this.state.inputForm[key].isUpToStandard}
                    alert={this.state.inputForm[key].alert}
                    type={this.state.inputForm[key].type} 
                    onChange={this.inputChangeHandler(key)}/>
            )
        })

        return(
            <div className={classes.datePicker}>
                <div className={classes.selectedDate}>
                    <FontAwesomeIcon icon={faCaretRight} />
                    <Button 
                        onClick={this.changeShowPicker} 
                        name={this.state.selectedDate} />
                    <FontAwesomeIcon icon={faCaretLeft} />
                </div>
                {this.state.showPicker?
                    <div className={classes.dateInput}>
                        <form className={classes.inputForm}>
                            {inputForm}
                            <p>{this.state.weekdays}</p>
                        </form>
                        
                        <Button 
                            type="button"
                            disabled={this.state.ifSubmitDisabled}
                        >
                            <Link
                            to={'/history?date='+ this.state.newSelectedDate}
                            className="a"
                            style={this.state.ifSubmitDisabled==='disabled'?
                                    null
                                    :{backgroundColor:'#d30208', 
                                        color:'#f5eed5',
                                        boxShadow:'1px 1px 2px 1px #171714'}}
                            >
                                Submit
                            </Link>
                        <Button />
                        <div className={classes.useCurrentDate}>
                            <Button 
                                name='Use Current Date'
                                onClick={this.useCurrentDate} />
                        </div>
                    </div>
                    :
                    null}
                <Backdrops 
                    showBackdrops={this.state.showPicker}
                    onClick={this.hidePicker}
                />
            </div>
        )
    }
}

export default DatePicker