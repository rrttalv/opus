import axios from 'axios';
import { GET_USERS, DELETE_USER, LOADING_USERS } from './constants';
import { tokenStatus } from './authActions';

export const getUsers = (page) => (dispatch, getState) => {
    dispatch({
        type: LOADING_USERS
    })
    axios.get(`/users/${page}`, tokenStatus(getState)).then(res => dispatch({
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
    axios.delete(`/users/delete/${toDelete.id}/${toDelete.page}`, tokenStatus(getState)).then(res => dispatch({
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