import React, { Component } from 'react'
import { Container } from 'reactstrap';
import UserDisplay from './UserDisplay';
import { Translate } from "react-localize-redux";

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Container>
                    <h3><Translate id="dash.title"></Translate></h3>
                    <UserDisplay></UserDisplay>
                </Container>
            </div>
        )
    }
}
