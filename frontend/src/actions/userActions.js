import axios from 'axios';
import { GET_USERS, DELETE_USER, LOADING_USERS } from './constants';
import { tokenStatus } from './authActions';

export const getUsers = (page) => (dispatch, getState) => {
    axios.get(`/api/users/${page}`, tokenStatus(getState)).then(res => dispatch({
        type: GET_USERS,
        payload: res.data
    }))
};

export const deleteUser = (id) => dispatch => {
    axios.post(`/api/users/delete/${id}`, tokenStatus(getState)).then(res => dispatch({
        type: DELETE_USER,
        payload: res.data
    }))
};

export const setLoading = () => {
    return {
        type: LOADING_USERS
    }
}