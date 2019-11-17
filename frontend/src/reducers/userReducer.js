import { GET_USERS, DELETE_USER, LOADING_USERS } from '../actions/constants';

const initState = { 
    users: [{}],
    loading: true,
    hasMore: false,
    page: 0
}

export default (state = initState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                hasMore: action.payload.hasMore,
                users: action.payload.users,
                page: action.payload.page,
                loading: false
            }
        case DELETE_USER:
            return {
                ...state,
                hasMore: action.payload.hasMore,
                users: action.payload.users,
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