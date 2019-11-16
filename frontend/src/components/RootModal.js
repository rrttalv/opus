import React, { Component } from 'react'
import UserDetailsModal from './UserDetailsModal';
import { connect } from 'react-redux';

class RootModal extends Component {
    
    modals = {
        'USER_MODAL': UserDetailsModal
    }

    render() {
        const currentModal = this.modals[this.props.modal.modalType];
        console.log(currentModal)
        return (
            <div>
            {this.props.modal.modalType ? <currentModal /> : null}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    modal: state
})

export default connect(mapStateToProps, null)(RootModal)