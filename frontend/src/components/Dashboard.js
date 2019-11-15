import React, { Component } from 'react'
import { Container } from 'reactstrap';
import UserDisplay from './UserDisplay';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Container>
                    <h1>User dashboard</h1>
                    <UserDisplay></UserDisplay>
                </Container>
            </div>
        )
    }
}
