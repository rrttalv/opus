import { SHOW_MODAL, HIDE_MODAL } from '../actions/constants';

const initState = {
    modalType: null,
    open: false,
    modalProps: {}
}

export default (state = initState, action) => {
    switch(action.type){
        case SHOW_MODAL:
            return {
                modalType: action.modalType,
                open: action.isOpen,
                modalProps: action.modalProps
            }
        case HIDE_MODAL:
            return initState
        default:
            return state
    }
}