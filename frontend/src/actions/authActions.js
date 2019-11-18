import { REGISTER_FAIL, USER_LOADING, REGISTER_SUCCESS,
        LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR,
        USER_LOADED, LOGOUT, STOP_LOADING,
        UPDATE_PASSWORD, VERIFY_EMAIL, RESET_PASSWORD,
        VERIFY_ERROR, RESET_ERROR, VERIFY_PASSWORD_TOKEN } from './constants';
import axios from 'axios'
import { getErrors } from './errorActions';
import { history } from '../index';

export const getLoginStatus = () => (dispatch, getState) => {
    // Set state to user loading
    dispatch({
        type: USER_LOADING
    })
    if(getState().auth.token){
        axios.get('/auth/signed', tokenStatus(getState)).then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        })).catch((err) => {
            dispatch(getErrors(err.response.data.message, err.response.status, 'AUTH_ERROR'));
            dispatch({
                type: AUTH_ERROR
            });
        });
    }else{
        dispatch({
            type: STOP_LOADING
        })
    }
}

export const verifyEmailAddress = emailToken => (dispatch) => {
    axios.put(`/auth/verify/${emailToken}`).then(res => dispatch({
        type: VERIFY_EMAIL,
        payload: res.data
    })).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'VERIFY_ERROR'));
        dispatch({
            type: VERIFY_ERROR
        })
    })
}

export const checkPasswordToken = token => (dispatch) => {
    axios.get(`/auth/reset/${token}`).then(res => dispatch({
        type: VERIFY_PASSWORD_TOKEN,
        payload: res.data
    })).catch((err) => {

    });
}

export const resetPassword = passwordDetails => (dispatch) => {
    axios.post(`/auth/reset/`, passwordDetails).then(res => dispatch({
        type: RESET_PASSWORD,
        payload: res.data
    })).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'RESET_ERROR'));
        dispatch({
            type: RESET_ERROR
        });
    })
}

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT
    })
}

export const tokenStatus = getState => {
    const token = getState().auth.token;
    const options = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    options.headers['x-auth-token'] = token
    
    return options;
}

export const loginUser = (userData) => dispatch => {
    axios.post('/auth/login', userData).then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        history.push('/dashboard')
    }).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        });
    });
}

export const registerUser = (newUser) => dispatch => {
    axios.post('/auth/register', newUser).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    })
};