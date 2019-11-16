import React, { Component, Fragment } from 'react'
import { Container, ListGroup, ListGroupItem, Button, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import { displayUserModal, displayDeleteWarning } from '../actions/modalActions';
import { PropTypes } from 'prop-types';
import Loading from './Loading';
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

    displayDeletePrompt = (user) => {
        this.props.displayDeleteWarning(user)
    }

    render() {
        const { users, loading } = this.props.users.user;
        const { open } = this.props.modal;
        const listGroupStyle = {display: 'flex', justifyContent: 'space-between'};
        const buttonStyle = {flex: '1', maxWidth: '10%', marginRight: '5px'};
        return (
            <Container className="margin-top">
                <ListGroup>{ 
                !loading ? users.map((element, i) => 
                (<ListGroupItem style={listGroupStyle} key={i}>
                    <h5 style={{width: '50%'}}>{element.email}</h5>
                    <Button color="info" style={buttonStyle} onClick={() => this.showUserModal(element)}>{'View'}</Button>
                    <Button color="danger" style={buttonStyle} onClick={() => this.displayDeletePrompt(element)}>{'Delete'}</Button>
                </ListGroupItem>)) 
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

export default connect(mapStateToProps, { getUsers, deleteUser, displayUserModal, displayDeleteWarning })(UserDisplay);