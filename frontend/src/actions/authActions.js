import { REGISTER_FAIL, USER_LOADING,
        REGISTER_LOADING, REGISTER_SUCCESS,
        LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR,
        USER_LOADED, LOGOUT} from './constants';
import axios from 'axios'
import { getErrors } from './errorActions';
import { history } from '../index';

export const getLoginStatus = () => (dispatch, getState) => {
    // Set state to user loading
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
    }
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
        history.push('/dashboard')
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        });
    });
}

export const registerUser = (newUser) => dispatch => {
    axios.post('/auth/register', newUser).then((res) => {
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