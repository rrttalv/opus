import { SHOW_MODAL, HIDE_MODAL } from './constants';

export const displayUserModal = (userInfo) => (dispatch) => {
    dispatch({
        type: SHOW_MODAL,
        modalType: 'USER_MODAL',
        isOpen: true,
        modalProps: userInfo
    });
};

export const displayDeleteWarning = (info) => (dispatch) => {
    dispatch({
        type: SHOW_MODAL,
        modalProps: info,
        isOpen: true,
        modalType: 'DELETE_MODAL'
    });
};

export const hideModal = () => (dispatch) => {
    dispatch({
        type: HIDE_MODAL
    });
};
