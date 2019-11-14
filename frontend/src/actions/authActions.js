import { REGISTER_FAIL, USER_LOADING,
        REGISTER_LOADING, REGISTER_SUCCESS,
        LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR,
        USER_LOADED} from './constants';
import axios from 'axios'

export const loginUser = (userData) => dispatch => {
    axios.post('/auth/login', userData).then(res => dispatch({
        type: USER_LOADING,
        payload: res.data
    }));
}

export const registerUser = (newUser) => dispatch => {
    axios.post('/auth/register', newUser).then(res => dispatch({
        type: REGISTER_LOADING,
        payload: res.data
    }))
};