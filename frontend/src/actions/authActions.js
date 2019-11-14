import { REGISTER_FAIL, USER_LOADING,
        REGISTER_LOADING, REGISTER_SUCCESS,
        LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR,
        USER_LOADED} from './constants';
import axios from 'axios'
import { getErrors } from './errorActions';

export const getLoginStatus = () => (dispatch, getState) => {
    // Set state to user loading
    var a = getState().auth.token
    var b = tokenStatus(getState)
    axios.get('/auth/signed', tokenStatus(getState)).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
}

export const tokenStatus = getState => {
    const token = getState().auth.token;
    const options = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    if(token){
        options.headers['x-auth-token'] = token
    }
    
    return options;
}

export const loginUser = (userData) => dispatch => {
    axios.post('/auth/login', userData).then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    })).catch((err) => {
        dispatch(getErrors(err.response.data.message, err.response.status));
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
        dispatch(getErrors(err.response.data.message, err.response.status));
        dispatch({
            type: REGISTER_FAIL
        })
    })
};