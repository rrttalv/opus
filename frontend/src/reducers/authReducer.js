import { REGISTER_FAIL, REGISTER_SUCCESS, 
        LOGIN_SUCCESS, USER_LOADING, 
        USER_LOADED, REGISTER_LOADING, 
        LOGIN_FAIL, AUTH_ERROR } from '../actions/constants';

const initState = {
    isAuthenticated: null,
    token: localStorage.getItem('token'),
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
                currentUser: action.payload
            }
        case REGISTER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR: {
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