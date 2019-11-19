import React, { Component } from 'react';
import { Translate } from 'react-localize-redux';

export default class Home extends Component {
    render () {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1><Translate id="home.title"></Translate></h1>
                <p><Translate id="home.sub_title"></Translate></p>
            </div>
        );
    }
}
