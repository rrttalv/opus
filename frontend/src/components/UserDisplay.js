import React, { Component, Fragment } from 'react'
import { Container, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import { PropTypes } from 'prop-types';
import Loading from './Loading';
import ReusableButton from './ReusableButton';
import UserDisplayModal from './UserDisplayModal'
class UserDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            currentUser: {}
        }
    }

    componentDidMount = () => {
        this.props.getUsers(0);
    }
    
    clickDelete = (id) => {
        this.props.deleteUser(id)
    }

    render() {
        const { users, loading } = this.props.users.user;
        const buttons = (
            <Fragment>
                <ReusableButton text={'Delete'} />
            </Fragment>
        )
        const displayUserDetails = id => {
            console.log(id);
            //this.setState({currentUser: })
        }
        return (
            <Container className="margin-top">
                <ListGroup>{ 
                !loading ? users.map((element, i) => 
                (<ListGroupItem style={{display: 'flex', justifyContent: 'space-between'}} key={i} onClick={() => displayUserDetails(element._id)}>
                    <h5 style={{width: '65%'}}>{element.email}</h5>{buttons}</ListGroupItem>)) 
                : <Loading />
                }
                </ListGroup>
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
    users: state
});

export default connect(mapStateToProps, { getUsers, deleteUser })(UserDisplay);