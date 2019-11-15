import { CLEAR_ERRORS, GET_ERRORS } from '../actions/constants';

const initState = {
    message: {},
    id: null,
    status: null
}

export default (state = initState, action) => {
    switch(action.type){
        case GET_ERRORS:
            return{
                message: action.payload.message,
                id: action.payload.id,
                status: action.payload.status
            }
        case CLEAR_ERRORS: 
            return{
                message: {},
                status: null,
                id: null
            }
        default:
            return state
    }
}