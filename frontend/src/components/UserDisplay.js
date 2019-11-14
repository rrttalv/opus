import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import { PropTypes } from 'prop-types';

class UserDisplay extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.getUsers(0);
    }
    
    clickDelete = (id) => {
        this.props.deleteUser(id)
    }

    render() {
        const { users } = this.props.users.user;
        return (
            <Container>
                <ListGroup>
                    {users.map((element, i) => (
                        <ListGroupItem key={i}>
                            <h3>{element.email}</h3>
                        </ListGroupItem>
                    ))}
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