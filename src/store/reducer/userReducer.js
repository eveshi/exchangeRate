import * as actionTypes from '../action/actionTypes'
import { updateObject } from '../utility'

const initState = {
    signin: false,
    error: null,
    currencyData:{

    },
    userData: {
        email: null,
        password: null,
        stared: null,
    },
    currencyStared:[
        'CNY',
        'JPY',
        'EUR',
    ]
}

const signinSuccessfully = (state, action) => {
    const updatedState = {
        signin: action.signin,
        userData: action.userData,
        currencyStared: action.userData.stared
    }
    return updateObject(state, updatedState)
}

const logout = (state, action) => {
    const updatedState = {
        signin: action.signin,
        userData: action.userData
    }
    return updateObject(state, updatedState)
}

const loadData = (state, action) => {
    const updatedState = {
        currencyData: action.currencyData
    }
    return updateObject(state, updatedState)
}

const changeStared = (state, action) => {
    const updatedState = {
        currencyStared: action.currencyStared
    }
    return updateObject(state, updatedState)
}

const reducer = (state=initState, action) => {
    switch(action.type){
        case actionTypes.signin_SUCCESSFULLY:
            return signinSuccessfully(state, action);
        case actionTypes.LOGOUT:
            return logout(state, action);
        case actionTypes.LOAD_DATA:
            return loadData(state, action);
        case actionTypes.CHANGE_STARED:
            return changeStared(state, action);
        default:
            return state;
    }
}

export default reducer;