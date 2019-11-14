import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import { PropTypes } from 'prop-types';

class UserDisplay extends Component {
    
    componentDidMount(){
        this.props.getUsers();
    }

    clickDelete = (id) => {
        this.props.deleteUser(id)
    }

    render() {
        const { users } = this.props.users.user;
        console.log(users);
        return (
            <Container>
                <ListGroup>
                    {users.map (({ user }) => 
                        <ListGroupItem key={user}>
                            { user.email }
                            <Button 
                            color="danger" 
                            size="md" 
                            onClick={this.clickDelete.bind(this, user.id)}> X </Button>
                        </ListGroupItem>
                    )}
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