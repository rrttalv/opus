import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import modalReducer from './modalReducer';
import { localizeReducer } from "react-localize-redux";
export default combineReducers({
    user: userReducer,
    auth: authReducer,
    error: errorReducer,
    modal: modalReducer,
    localize: localizeReducer
})