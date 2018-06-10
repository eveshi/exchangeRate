import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/action/index'
import axios from '../../../axios_data';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom'

import Input from '../../../components/input/input'
import Button from '../../../components/button/button'
import AlertBox from '../.././../components/alertBox/alertBox'
import classes from './register.css'

class signinOrsignup extends Component {
    state={
        signinData:{
            email: {
                value: '',
                placeholder: 'example@example.com',
                name: 'Email',
                type: null,
            },
            password: {
                value: '',
                placeholder: 'password',
                name: 'Password',
                type: 'password',
            }},
        signupData:{
            email: {
                value: '',
                placeholder: 'example@example.com',
                name: 'Email',
                type: null,
                isUpToStandard: null,
                alert: 'Wrong type',
            },
            password: {
                value: '',
                placeholder: 'password',
                name: 'Password',
                type: 'password',
                isUpToStandard: null,
                alert: 'one number & one letter',
            },
            passwordRepeated: {
                value: '',
                placeholder: 'repeat password',
                name: 'Repeat Password',
                type: 'password',
                isUpToStandard: null,
                alert: 'Not the same',
            },
        },
        signinFail: null,
        signupFail: null,
        signupSuccess: null,
        hashRounds: 10,
    }

    changeHandler = (event, dataSource, key) => {
        const value = event.target.value
        switch(dataSource){
            case 'signupData':
                switch(key){
                    case 'email':
                        const emailReg = /.*@\w*[.]\w*/;
                        if(emailReg.test(value) === false){
                            this.setState({
                                signupData: {
                                    ...this.state.signupData,
                                    email:{
                                        ...this.state.signupData.email,
                                        isUpToStandard: false,
                                        value: value
                                    }}
                                })
                        }else{
                            this.setState({
                                signupData: {
                                    ...this.state.signupData,
                                    email:{
                                        ...this.state.signupData.email,
                                        isUpToStandard: true,
                                        value: value
                                    }
                                }})
                        }
                        break;
                    case 'password':
                        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                        if(passwordReg.test(value) === false){
                            this.setState({
                                signupData: {
                                    ...this.state.signupData,
                                    password:{
                                        ...this.state.signupData.password,
                                        isUpToStandard: false,
                                        value: value
                                    }
                                }
                            })
                        }else{
                            this.setState({
                                signupData: {
                                    ...this.state.signupData,
                                    password:{
                                        ...this.state.signupData.password,
                                        isUpToStandard: true,
                                        value: value
                                    }
                                }
                            })
                        }
                        break;
                    case 'passwordRepeated':
                        if(value !== this.state.signupData.password.value){
                            this.setState({
                                signupData: {
                                    ...this.state.signupData,
                                    passwordRepeated:{
                                        ...this.state.signupData.passwordRepeated,
                                        isUpToStandard: false,
                                        value: value
                                    }
                                }
                            })
                        }else if(value === this.state.signupData.password.value){
                            this.setState({
                                signupData: {
                                    ...this.state.signupData,
                                    passwordRepeated:{
                                        ...this.state.signupData.passwordRepeated,
                                        isUpToStandard: true,
                                        value: value
                                    }
                                }
                            })
                        };
                        break;
                    default:
                        break;
                }
                break;
            case 'signinData':
                this.setState({
                    signinData: {
                        ...this.state.signinData,
                        [key]:{
                            ...this.state.signinData[key],
                            value: value
                        }
                    }
                });
                break;
            default:
                return false
        }
    }

    signupSubmitHandler = () => {
        let signupData = {}
        let newUser = {}
        const salt = bcrypt.genSaltSync(this.state.hashRounds)
        Object.assign(signupData, this.state.signupData)
        Object.keys(signupData).map((key) => {
            if(key === 'password'){
                const password = bcrypt.hashSync(signupData.password.value, salt)
                const item = {password: password}
                newUser={...newUser, ...item}
            }else{
                const item = {[key]: signupData[key].value}
                newUser={...newUser, ...item}
            }
        })
        newUser = {
            ...newUser,
            stared: [
                'CNY',
                'JPY',
                'EUR',
            ]
        }
        axios.post('/api/signup', {
            newUser: newUser
        }).then((response) => {
            const message = response.data
            if(message === 'The email has been registered'){
                this.setState({
                    signupFail: true
                })
            }else if(message === 'Successfully Registered'){
                this.setState({
                    signupSuccess: true
                })
            }
        })
    }

    signinSubmitHandler = () => {
        let signinData = {}
        let oldUser = {}
        Object.assign(signinData, this.state.signinData)
        Object.keys(signinData).map((key) => {
            const item = {[key]: signinData[key].value}
            oldUser = {...oldUser, ...item}
        })
        axios.post('/api/signin', {
            oldUser: oldUser
        }).then((response) => {
            const message = response.data
            if(message === 'wrong password'){
                this.setState({
                    signinFail: true
                })
            }else if(message === 'invalid email'){
                this.setState({
                    signinFail: true
                })
            }else{
                this.props.signinSuccessfully(message)
                window.history.back()
            }
        })
    }

    signinFailconfirm = () => {
        this.setState({
            signinFail: false
        })
    }

    signupFailconfirm = () => {
        this.setState({
            signupFail: false
        })
    }

    signupSuccessconfirm = () => {
        window.location.reload()
    }

    render(){
        const signupForms = Object.keys(this.state.signupData).map((key) => {
            return (
                <div 
                    key={key}
                    className={classes.singleItem}>
                    <p>
                        {this.state.signupData[key].name}:
                    </p>
                    <Input
                        placeholder = {this.state.signupData[key].placeholder}
                        value={this.state.signupData[key].value}
                        onChange={(event) => this.changeHandler(event, 'signupData', key)}
                        type={this.state.signupData[key].type}
                        isUpToStandard={this.state.signupData[key].isUpToStandard}
                        alert={this.state.signupData[key].alert}
                        maxlength='20' />
                </div>
                )
        })

        const signinForms = Object.keys(this.state.signinData).map((key) => {
            return (
                <div key={key} className={classes.singleItem}>
                    <p>{this.state.signinData[key].name}:</p>
                    <Input
                        placeholder = {this.state.signinData[key].placeholder}
                        value={this.state.signinData[key].value}
                        onChange={(event) => this.changeHandler(event, 'signinData', key)}
                        type={this.state.signinData[key].type}
                        maxlength='20' />
                </div>)
        })

        let canUserSubmit = 'disabled'

        if(this.state.signupData.email.isUpToStandard &&
            this.state.signupData.password.isUpToStandard &&
            this.state.signupData.passwordRepeated.isUpToStandard){
                canUserSubmit = null
            }

        return(
            <div className={classes.pageDesign}>
                <div className={classes.signup}>
                    <p className={classes.head}>Sign Up</p>
                    <form>
                        {signupForms}
                    </form>
                    <Button name='Submit' onClick={this.signupSubmitHandler} 
                        disabled={canUserSubmit}
                        style={canUserSubmit==='disabled'?
                                null:
                                {backgroundColor:'#d30208', 
                                    color:'#f5eed5',
                                    boxShadow:'1px 1px 2px 1px #171714'}}/>
                    <a href='#signin'>Already have account, sign in now.</a>
                </div>
                <div id='signin' className={classes.signin}>
                    <p className={classes.head}>Sign In</p>
                    <form>
                        {signinForms}
                    </form>
                    <Button name='Submit' onClick={this.signinSubmitHandler} />
                </div>
                {this.state.signinFail === true?
                    <AlertBox alertContent='Wrong email or password，try again.' 
                        confirm='OK'
                        onClick={this.signinFailconfirm} />:null}
                {this.state.signupFail === true?
                    <AlertBox alertContent= 'Email already registered, try another one.' 
                        confirm='OK'
                        onClick={this.signupFailconfirm} />:null}
                {this.state.signupSuccess === true?
                    <AlertBox alertContent='Sign up successfully, sign in again.' 
                        confirm='OK'
                        onClick={this.signupSuccessconfirm} />:null}               
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

const mapActionToProps = dispatch => {
    return {
        signinSuccessfully: (userData) => dispatch(actions.signinSuccessfully(userData))
    }
}

export default connect(mapStateToProps, mapActionToProps)(signinOrsignup)