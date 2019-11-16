import { SHOW_MODAL, HIDE_MODAL } from './constants';

export const displayUserModal = (dispatch, userInfo) => dispatch({
    type: SHOW_MODAL,
    modal: 'USER_MODAL',
    modalProps: userInfo
})