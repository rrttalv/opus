import { GET_ERRORS, CLEAR_ERRORS } from './constants';

export const getErrors = (message, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {message, status, id}
    };
};

export const clearAllErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};