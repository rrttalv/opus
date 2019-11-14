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
        return (
            <Container>
                <ListGroup>
                    {users.map (({ id, email }) => 
                        <ListGroupItem key={email}>
                            { email }
                            <Button 
                            color="danger" 
                            size="md" 
                            onClick={this.clickDelete.bind(this, id)}> X </Button>
                        </ListGroupItem>
                    )}
                </ListGroup>
            </Container>
        )
    }
}

UserDisplay.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    users: state
});

export default connect(mapStateToProps, { getUsers, deleteUser })(UserDisplay);