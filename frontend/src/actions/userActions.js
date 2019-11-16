import axios from 'axios';
import { GET_USERS, DELETE_USER, LOADING_USERS } from './constants';
import { tokenStatus } from './authActions';

export const getUsers = (page) => (dispatch, getState) => {
    dispatch({
        type: LOADING_USERS
    })
    axios.get(`/api/users/${page}`, tokenStatus(getState)).then(res => dispatch({
        type: GET_USERS,
        payload: res.data
    })).catch((err) => {
        console.log(err);
    })
};

export const deleteUser = (toDelete) => (dispatch, getState) => {
    dispatch({
        type: LOADING_USERS
    })
    axios.post(`/api/users/delete`, toDelete, tokenStatus(getState)).then(res => dispatch({
        type: DELETE_USER,
        payload: res.data
    })).catch((err) => {
        console.log(err);
    })
};

export const setLoading = () => {
    return {
        type: LOADING_USERS
    }
}