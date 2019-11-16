import React, { Component } from 'react'
import UserDetailsModal from './UserDetailsModal';
import { Modal } from 'reactstrap';
import { connect } from 'react-redux';

class RootModal extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            modalOpen: props.modal.open
        }
        //this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.modal.open !== this.props.modal.open){
            this.setState({modalOpen: nextProps.modal.open});
        }
    }

    modals = {
        'USER_MODAL': UserDetailsModal
    }

    render() {
        if(this.props.modal.modalType){
            const SelectedModal = this.modals[this.props.modal.modalType];
            return (
                <Modal isOpen={this.props.modal.open}>
                    <SelectedModal></SelectedModal>
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

export default connect(mapStateToProps, null)(RootModal)