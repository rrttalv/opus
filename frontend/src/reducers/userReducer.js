import { GET_USERS, DELETE_USER, LOADING_USERS } from '../actions/constants';

const initState = { 
    users: [{}],
    loading: false
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
                users: state.users.filter(user => user._id !== action.payload)
            }
        case LOADING_USERS:
            return {
                ...state,
                loading: true
            }
        default: return state
    }
}