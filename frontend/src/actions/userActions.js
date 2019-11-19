import axios from 'axios';
import { GET_USERS, DELETE_USER, LOADING_USERS, REGISTER_FAIL, REGISTER_SUCCESS } from './constants';
import { tokenStatus } from './authActions';
import { getErrors } from './errorActions';

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

export const addUser = (newUser, modalToggle, currentPage) => (dispatch) => {
    axios.post('/auth/register', newUser).then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })).then(() => {
        modalToggle();
        dispatch(getUsers(currentPage));
    }).catch((err) => {
        console.log(err);
        dispatch(getErrors(err.response.data.message, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

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