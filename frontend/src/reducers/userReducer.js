import { GET_USERS, REGISTER_USER, DELETE_USER } from '../actions/constants';

const initState = { 
    users: [
        {email: 'asdas@sdsa.io', id: "sssaa"},
        {email: 'rico@dasd', id: "sss33"},
        {email: 'ee@dasd', id: "ggg22"},
        {email: 'afdf@asdads.com', id: "sss333223"}
    ]
}

export default (state = initState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state
            }
        case REGISTER_USER:
            return {
                ...state
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }
            default: return state
    }
}