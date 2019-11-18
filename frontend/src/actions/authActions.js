import { REGISTER_FAIL, USER_LOADING, REGISTER_SUCCESS,
        LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR,
        USER_LOADED, LOGOUT, STOP_LOADING,
        UPDATE_PASSWORD, VERIFY_EMAIL, RESET_PASSWORD,
        VERIFY_ERROR, RESET_ERROR, VERIFY_PASSWORD_TOKEN,
        VERIFY_TOKEN_ERROR } from './constants';
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

export const verifyEmailAddress = (emailToken, history) => (dispatch) => {
    axios.put(`/auth/verify/${emailToken}`).then(res => dispatch({
        type: VERIFY_EMAIL,
        payload: res.data
    })).then(() => {
        history.push('/')
    }).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'VERIFY_ERROR'));
        dispatch({
            type: VERIFY_ERROR
        })
    })
}

export const checkPasswordToken = token => (dispatch) => {
    axios.get(`/auth/reset/password/${token}`).then(res => dispatch({
        type: VERIFY_PASSWORD_TOKEN,
        payload: res.data
    })).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'VERIFY_TOKEN_ERROR'));
        dispatch({
            type: VERIFY_TOKEN_ERROR
        });
    });
}

export const resetPassword = (passwordDetails, history) => (dispatch) => {
    axios.post(`/auth/reset/password/`, passwordDetails).then(res => dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
    })).then(() => {
        history.push('/')
    }).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'RESET_ERROR'));
        dispatch({
            type: RESET_ERROR
        });
    })
}

export const sendResetPasswordRequest = (userDetails, history) => (dispatch) => {
    axios.post(`/auth/reset`, userDetails).then(res => dispatch({
        type: RESET_PASSWORD,
        payload: res.data
    })).then(() => {
        history.push('/')
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