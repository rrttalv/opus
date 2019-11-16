import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import modalReducer from './modalReducer';

export default combineReducers({
    user: userReducer,
    auth: authReducer,
    error: errorReducer,
    modal: modalReducer
})