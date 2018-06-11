import reducer from './userReducer'
import * as actionTypes from '../action/actionTypes'

describe('reducer', () => {

    it('return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
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
        })
    })

    it('return new userData after signin', () => {
        expect(reducer({
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
        }, {
            type: actionTypes.signin_SUCCESSFULLY,
            userData: {
                email: 'sample',
                password: 'sample',
                stared: ['sample']
            },
            signin: true,
        })).toEqual({
            signin: true,
            error: null,
            currencyData:{
        
            },
            userData: {
                email: 'sample',
                password: 'sample',
                stared: ['sample']
            },
            currencyStared:[
                'sample'
            ]
        })
    })
})