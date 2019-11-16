import { SHOW_MODAL, HIDE_MODAL } from './constants';

export const displayUserModal = userInfo => dispatch => {
    console.log(userInfo)
    dispatch({
        type: SHOW_MODAL,
        modal: 'USER_MODAL',
        modalProps: userInfo
    })
};