import React, { Component } from 'react'
import { ModalBody, ModalFooter, Row, Col, Button } from 'reactstrap';
import { deleteUser } from '../../actions/userActions';
import { connect } from 'react-redux';

class DeleteConfirmationModal extends Component {    

    handleUserDelete = () => {
        const deletionData = {
            id: this.props.data._id,
            page: 0
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

const matchStateToProps = state => ({
    user: state.user
})

export default connect(matchStateToProps, {deleteUser})(DeleteConfirmationModal);