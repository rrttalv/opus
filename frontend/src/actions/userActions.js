import { GET_USERS, REGISTER_USER, DELETE_USER } from './constants';

export const getUsers = () => {
    return {
        type: GET_USERS
    };
};

export const registerUser = () => {
    return {
        type: REGISTER_USER
    };
};

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: id
    };
};