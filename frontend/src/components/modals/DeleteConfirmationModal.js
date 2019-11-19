import React, { Component } from 'react';
import { ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Translate } from 'react-localize-redux';
import { deleteUser } from '../../actions/userActions';

class DeleteConfirmationModal extends Component {
    handleUserDelete = () => {
        const { page } = this.props.user;
        const { data } = this.props;
        const deletionData = {
            id: data._id,
            page
        };
        this.props.deleteUser(deletionData);
    }

    componentDidUpdate = (usersList) => {
        if (this.props.user !== usersList) {
            this.props.toggle();
        }
    }

    render () {
        const { toggle } = this.props;
        const { data } = this.props;
        return (
            <div>
                <ModalBody>
                    <h5><Translate id="modals.user_delete.title" data={{ first: data.firstName, last: data.lastName }}></Translate></h5>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleUserDelete} size="md" color="danger"><Translate id="buttons.del"></Translate></Button>
                    <Button onClick={toggle} color="info" size="md"><Translate id="buttons.cancel"></Translate></Button>
                </ModalFooter>
            </div>
        );
    }
}

DeleteConfirmationModal.propTypes = {
    user: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
};

const matchStateToProps = (state) => ({
    user: state.user
});

export default connect(matchStateToProps, { deleteUser })(DeleteConfirmationModal);
