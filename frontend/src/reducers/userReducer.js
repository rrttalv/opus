import { GET_USERS, DELETE_USER, LOADING_USERS } from '../actions/constants';

const initState = { 
    users: [{}],
    loading: true,
    page: 0
}

export default (state = initState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case DELETE_USER:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case LOADING_USERS:
            return {
                ...state,
                loading: true
            }
        default: return state
    }
}