import React, { Component, Fragment } from 'react'
import { Container, ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import { displayUserModal, displayDeleteWarning } from '../actions/modalActions';
import { PropTypes } from 'prop-types';
import Loading from './Loading';
import RootModal from './RootModal';
import UserPagination from './UserPagination';

class UserDisplay extends Component {

    constructor(props){
        super(props);
        this.state = {
            pageNumber: 0
        }
    }

    componentDidMount = () => {
        this.props.getUsers(this.state.pageNumber);
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
        const { users, loading } = this.props.users;
        const { open } = this.props.modal;
        const spanStyle = {fontWeight: '600', verticalAlign: 'sub', width: '75%', marginBottom: '0'};
        const buttonStyle = {flex: '1', maxWidth: 'fit-content', marginRight: '5px'};
        return (
            <Container className="margin-top padding-bottom">
                <ListGroup>{ 
                !loading ? users.map((element, i) => 
                (<ListGroupItem className="margin-top" key={i}>
                    <Row>
                        <Col xs="6" lg="10">
                        <span style={spanStyle}>{element.email}</span>
                        </Col>
                        <Col xs="3" lg="1">
                        <Button color="info" style={buttonStyle} onClick={() => this.showUserModal(element)}>{'View'}</Button>
                        </Col>
                        <Col xs="3" lg="1">
                        <Button color="danger" style={buttonStyle} onClick={() => this.displayDeletePrompt(element)}>{'Delete'}</Button>
                        </Col>
                        
                        
                    </Row>
                </ListGroupItem>)) 
                : <Loading />
                }
                </ListGroup>
                { open ? <RootModal /> : null }
                <UserPagination />
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
    users: state.user,
    modal: state.modal
});

export default connect(mapStateToProps, { getUsers, deleteUser, displayUserModal, displayDeleteWarning })(UserDisplay);