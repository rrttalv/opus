import axios from 'axios';
import { GET_USERS, REGISTER_USER, LOGIN_USER, DELETE_USER, LOADING_USERS } from './constants';

export const getUsers = (page) => dispatch => {
    axios.get(`/api/users/${page}`).then(res => dispatch({
        type: GET_USERS,
        payload: res.data
    }))
};

export const registerUser = (newUser) => dispatch => {
    axios.post('/auth/register', newUser).then(res => dispatch({
        type: REGISTER_USER,
        payload: res.data
    }))
};

export const deleteUser = (id) => dispatch => {
    axios.post(`/api/users/delete/${id}`, id).then(res => dispatch({
        type: DELETE_USER,
        payload: res.data
    }))
};

export const loginUser = (userData) => dispatch => {
    axios.post('/auth/login', userData).then(res => dispatch({
        type: LOGIN_USER,
        payload: res.data
    }));
}

export const setLoading = () => {
    return {
        type: LOADING_USERS
    }
}