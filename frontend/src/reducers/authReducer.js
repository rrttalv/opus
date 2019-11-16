import { REGISTER_FAIL, REGISTER_SUCCESS, 
        LOGIN_SUCCESS, USER_LOADING, 
        USER_LOADED, REGISTER_LOADING, 
        LOGIN_FAIL, AUTH_ERROR, LOGOUT } from '../actions/constants';

const initState = {
    token: localStorage.getItem('id_token'),
    isAuthenticated: null,
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
                isLoading: true,
                user: action.payload
            }
        case REGISTER_LOADING:
            return{
                ...state,
                isLoading: true
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
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR: {
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