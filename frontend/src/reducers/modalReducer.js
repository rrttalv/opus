import { SHOW_MODAL, HIDE_MODAL } from '../actions/constants';

const initState = {
    modalType: null,
    modalProps: {}
}

export default (state = initState, action) => {
    switch(action.type){
        case SHOW_MODAL:
            console.log(action)
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case HIDE_MODAL:
            return initState
        default:
            return state
    }
}