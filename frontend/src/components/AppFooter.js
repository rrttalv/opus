import React, { Component } from 'react';
import { Container } from 'reactstrap';
import LanguageToggle from './LanguageToggle';

export default class AppFooter extends Component {
    render () {
        return (
            <div className="footer">
                <Container >
                    <LanguageToggle></LanguageToggle>
                </Container>
            </div>
        );
    }
}
