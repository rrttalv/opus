import { SHOW_MODAL, HIDE_MODAL } from './constants';

export const displayUserModal = userInfo => dispatch => {
    dispatch({
        type: SHOW_MODAL,
        modalType: 'USER_MODAL',
        isOpen: true,
        modalProps: userInfo
    })
};