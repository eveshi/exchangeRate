import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/action/index'
import axios from '../../../axios_data'
import bcrypt from 'bcryptjs'

import TopBar from '../../../components/topBar/topBar'
import AlertBox from '../../../components/alertBox/alertBox'
import Input from '../../../components/input/input'
import Button from '../../../components/button/button'
import classes from './userDetail.css'

class UserDetails extends Component {
    state = {
        passwordInputProps:{
            password: {
                value: '',
                placeholder: 'password',
                name: 'Password',
                type: 'password',
                isUpToStandard: null,
                alert: 'One number & one letter',
            },
            passwordRepeated: {
                inputType: 'text',
                value: '',
                placeholder: 'repeat password',
                name: 'Repeat Password',
                type: 'password',
                isUpToStandard: null,
                alert: 'Not the same',
            },
        },
        userData: this.props.userData
    }

    changeHandler = (event, key) => {
        const value = event.target.value
        switch(key){
            case 'password':
                const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if(passwordReg.test(value) === false &&
                    value !== ''){
                        console.log('lalala')
                    this.setState({
                        passwordInputProps: {
                            ...this.state.passwordInputProps,
                            password:{
                                ...this.state.passwordInputProps.password,
                                isUpToStandard: false,
                                value: value
                            }
                        }
                    })
                }else{
                    console.log('yayaya')
                    this.setState({
                        passwordInputProps: {
                            ...this.state.passwordInputProps,
                            password:{
                                ...this.state.passwordInputProps.password,
                                isUpToStandard: true,
                                value: value
                            }
                        }
                    })
                }
                break;
            case 'passwordRepeated':
                if(value !== this.state.passwordInputProps.password.value &&
                    value !== ''){
                    this.setState({
                        passwordInputProps: {
                            ...this.state.passwordInputProps,
                            passwordRepeated:{
                                ...this.state.passwordInputProps.passwordRepeated,
                                isUpToStandard: false,
                                value: value
                            }
                        }
                    })
                }else if(value === this.state.passwordInputProps.password.value){
                    this.setState({
                        passwordInputProps: {
                            ...this.state.passwordInputProps,
                            passwordRepeated:{
                                ...this.state.passwordInputProps.passwordRepeated,
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
    }

    submitPasswordChange = () => {
        const password = this.state.passwordInputProps.password.value
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(password, salt)
        axios.post('/api/changePassword', {
            password: passwordHash,
            email: this.props.userData.email
        }).then((response) => {
            const userData = response.data
            console.log(userData)
            this.props.signinSuccessfully(userData)
            this.setState({
                newPasswordSaved: true
            })
        })
    }

    saveConfirm = () => {
        this.setState({
            passwordInputProps:{
                password: {
                    value: '',
                    placeholder: 'password',
                    name: 'Password',
                    type: 'password',
                    isUpToStandard: null,
                    alert: 'One number & one letter',
                },
                passwordRepeated: {
                    inputType: 'text',
                    value: '',
                    placeholder: 'repeat password',
                    name: 'Repeat Password',
                    type: 'password',
                    isUpToStandard: null,
                    alert: 'Not the same',
                },
            },
            userData: this.props.userData
        })
    }

    render(){
        let canUserSubmit = 'disabled'

        if((this.state.passwordInputProps.password.isUpToStandard !== false &&
            this.state.passwordInputProps.passwordRepeated.isUpToStandard !== false) &&
            (this.state.passwordInputProps.password.isUpToStandard !== null ||
            this.state.passwordInputProps.passwordRepeated.isUpToStandard !== null)&&
            (this.state.passwordInputProps.password.value !== '' ||
            this.state.passwordInputProps.passwordRepeated.value !== '') &&
            (this.state.passwordInputProps.password.isUpToStandard ===
            this.state.passwordInputProps.passwordRepeated.isUpToStandard)){
                canUserSubmit = null
            }

        const changePasswordForms = Object.keys(this.state.passwordInputProps).map((key) => {
            return (
                <div key={key} className={classes.singleItem}>
                    <p>{this.state.passwordInputProps[key].name}:</p>
                    <Input
                        placeholder = {this.state.passwordInputProps[key].placeholder}
                        value={this.state.passwordInputProps[key].value}
                        onChange={(event) => this.changeHandler(event, key)}
                        type={this.state.passwordInputProps[key].type}
                        maxlength='20'
                        isUpToStandard={this.state.passwordInputProps[key].isUpToStandard}
                        alert={this.state.passwordInputProps[key].alert} />
                </div>)
        })

        return(
            <div>
                <TopBar pageTitle='User Settings'>
                    <p className={classes.email}>{this.state.userData.email}</p>
                </TopBar>
                <div className={classes.changePassword}>
                    {changePasswordForms}
                    <Button 
                        name='Submit' 
                        onClick={this.submitPasswordChange} 
                        disabled={canUserSubmit}
                        style={canUserSubmit==='disabled'?
                                    null:
                                    {backgroundColor:'#d30208', 
                                        color:'#f5eed5',
                                        boxShadow:'1px 1px 2px 1px #171714'}}/>
                </div>
                {this.state.save?
                    <AlertBox alertContent='New Password Is Saved~' 
                        confirm='OK!'
                        onClick={this.saveConfirm} />
                        :null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signin: state.signin,
        userData: state.userData
    }
}

const mapActionsToProps = dispatch => {
    return {
        signinSuccessfully: (userData) => dispatch(actions.signinSuccessfully(userData))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(UserDetails)