import * as actionTypes from '../action/actionTypes'
import { updateObject } from '../utility'

const initState = {
    login: false,
    error: null,
    userData: {
        name: null,
        email: null,
        password: null,
        stared: null,
    }
}

const loginSuccessfully = (state, action) => {
    const updatedState = {
        login: action.login,
        userData: action.userData
    }
    return updateObject(state, updatedState)
}

const loginFailed = (state, action) => {
    const updatedState = {
        login: action.login,
        error: action.error
    }
    return updateObject(state, updatedState)
}

const logout = (state, action) => {
    const updatedState = {
        login: action.login,
        userData: action.userData
    }
    return updateObject(state, updatedState)
}

const reducer = (state=initState, action) => {
    switch(action.type){
        case actionTypes.LOGIN_SUCCESSFULLY:
            return loginSuccessfully(state, action);
        case actionTypes.LOGIN_FAILED:
            return loginFailed(state, action);
        case actionTypes.LOGOUT:
            return logout(state, action);
        default:
            return state;
    }
}

export default reducer;