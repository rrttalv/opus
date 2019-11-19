import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Translate } from 'react-localize-redux';
import UserDisplay from './UserDisplay';

export default class Dashboard extends Component {
    render () {
        return (
            <div>
                <Container>
                    <h3><Translate id="dash.title"></Translate></h3>
                    <UserDisplay></UserDisplay>
                </Container>
            </div>
        );
    }
}
