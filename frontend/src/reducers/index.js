import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

export default combineReducers({
    user: userReducer,
    auth: authReducer,
    error: errorReducer
})