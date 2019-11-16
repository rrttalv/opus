import React, { Component, Fragment } from 'react'
import { Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import { displayUserModal } from '../actions/modalActions';
import { PropTypes } from 'prop-types';
import Loading from './Loading';
import ReusableButton from './ReusableButton';
import RootModal from './RootModal'
class UserDisplay extends Component {

    componentDidMount = () => {
        this.props.getUsers(0);
    }
    
    clickDelete = (id) => {
        this.props.deleteUser(id)
    }

    showUserModal = (user) => {
        this.props.displayUserModal(user)
    }

    render() {
        const { users, loading } = this.props.users.user;
        const { open } = this.props.modal;
        const buttons = (
            <Fragment>
                <ReusableButton text={'Delete'} />
            </Fragment>
        )
        return (
            <Container className="margin-top">
                <ListGroup>{ 
                !loading ? users.map((element, i) => 
                (<ListGroupItem onClick={() => this.showUserModal(element)} style={{display: 'flex', justifyContent: 'space-between'}} key={i}>
                    <h5 style={{width: '65%'}}>{element.email}</h5>{buttons}</ListGroupItem>)) 
                : <Loading />
                }
                </ListGroup>
                { open ? <RootModal /> : null }
            </Container>
        )

    }
}

UserDisplay.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    users: state,
    modal: state.modal
});

export default connect(mapStateToProps, { getUsers, deleteUser, displayUserModal })(UserDisplay);