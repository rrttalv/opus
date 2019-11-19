import { REGISTER_FAIL, REGISTER_SUCCESS, 
        LOGIN_SUCCESS, USER_LOADING, 
        USER_LOADED, LOGIN_FAIL, 
        AUTH_ERROR, LOGOUT, 
        STOP_LOADING, VERIFY_EMAIL, 
        RESET_PASSWORD, UPDATE_PASSWORD,
        RESET_ERROR, VERIFY_ERROR,
        VERIFY_PASSWORD_TOKEN, VERIFY_TOKEN_ERROR } from '../actions/constants';

const initState = {
    token: localStorage.getItem('id_token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default (state = initState, action) => {
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case LOGOUT:
            localStorage.clear();
            return{
                state: initState
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('id_token', action.payload.token);
            return{
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false
            }
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
        case STOP_LOADING:
            return{
                ...state,
                isLoading: false
            }
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case RESET_ERROR:
        case VERIFY_ERROR:
        case RESET_PASSWORD:
        case UPDATE_PASSWORD:
        case VERIFY_EMAIL:
        case VERIFY_PASSWORD_TOKEN:
        case VERIFY_TOKEN_ERROR: {
            localStorage.clear();
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        }
        default:
            return state
    }
}