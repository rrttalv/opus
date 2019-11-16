import React, { Component } from 'react'
import UserDetailsModal from './modals/UserDetailsModal';
import DeleteConfirmationModal from './modals/DeleteConfirmationModal'
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';
import { hideModal } from '../actions/modalActions';

class RootModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            modalOpen: props.modal.open
        }
    }

    closeModal = () => {
        this.props.hideModal();
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.modal.open !== this.props.modal.open){
            this.setState({modalOpen: nextProps.modal.open});
        }
    }

    modals = {
        'USER_MODAL': UserDetailsModal,
        'DELETE_MODAL': DeleteConfirmationModal
    }

    render() {
        if(this.props.modal.modalType){
            const SelectedModal = this.modals[this.props.modal.modalType];
            return (
                <Modal isOpen={this.props.modal.open} toggle={this.closeModal}>
                    <SelectedModal toggle={this.closeModal} data={this.props.modal.modalProps}></SelectedModal>
                </Modal>
            )
        }else{
            return (
                <div></div>
            )
        }

    }
}


const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(mapStateToProps, { hideModal })(RootModal)