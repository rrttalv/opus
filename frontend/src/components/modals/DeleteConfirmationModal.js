import React, { Component } from 'react'
import { ModalBody, ModalFooter, Row, Col, Button } from 'reactstrap';
import { deleteUser } from '../../actions/userActions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class DeleteConfirmationModal extends Component {    

    handleUserDelete = () => {
        const { page } = this.props.user;
        const { data } = this.props;
        const deletionData = {
            id: data._id,
            page: page
        }
        this.props.deleteUser(deletionData);
    }

    componentDidUpdate = (usersList) => {
        if(this.props.user !== usersList){
            this.props.toggle()
        }
    }

    render() {
        const { toggle } = this.props;
        const { data } = this.props;
        return (
            <div>
                <ModalBody>
                    <h5>{`Do you want to delete ${data.firstName} ${data.lastName}?`}</h5>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleUserDelete} size="md" color="danger">{`Delete`}</Button>
                    <Button onClick={toggle} color="info" size="md">{`Cancel`}</Button>
                </ModalFooter>
            </div>
        )
    }
}

DeleteConfirmationModal.propTypes = {
    user: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
}

const matchStateToProps = state => ({
    user: state.user
})

export default connect(matchStateToProps, {deleteUser})(DeleteConfirmationModal);