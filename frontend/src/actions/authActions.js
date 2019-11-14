import { REGISTER_FAIL, USER_LOADING,
        REGISTER_LOADING, REGISTER_SUCCESS,
        LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR,
        USER_LOADED} from './constants';
import axios from 'axios'

export const loadUser = () => (dispatch, getState) => {
    // Set state to user loading
    dispatch({
        type: USER_LOADING
    });
    const options = {
        headers: {'x-auth-token': getState().auth.token !== undefined ? getState().auth.token : ''}
    }
    axios.get('/auth/signed', options).then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    })).catch((err) => {
        dispatch({
            type: AUTH_ERROR
        });
    });
}

export const loginUser = (userData) => dispatch => {
    axios.post('/auth/login', userData).then(res => dispatch({
        type: USER_LOADING,
        payload: res.data
    })).catch((err) => {
        dispatch({
            type: LOGIN_FAIL
        });
    })
}

export const registerUser = (newUser) => dispatch => {
    axios.post('/auth/register', newUser).then(res => dispatch({
        type: REGISTER_LOADING,
        payload: res.data
    })).catch((err) => {
        dispatch({
            type: REGISTER_FAIL
        })
    })
};