import * as actionTypes from './actionTypes'

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