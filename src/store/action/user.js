import * as actionTypes from './actionTypes'

export const signinSuccessfully = (userData) => {
    return {
        type: actionTypes.signin_SUCCESSFULLY,
        signin: true,
        userData: userData,
        currencyStared: userData.stared
    }
}

export const logout = (initUserData) => {
    return {
        type:actionTypes.LOGOUT,
        signin: false,
        userData: {
            name: null,
            email: null,
            password: null,
            stared: null,
        }
    }
}

export const loadData = (currencyData) => {
    return {
        type: actionTypes.LOAD_DATA,
        currencyData: currencyData
    }
}

export const changeStared = (currencyStared) => {
    return {
        type: actionTypes.CHANGE_STARED,
        currencyStared: currencyStared
    }
}