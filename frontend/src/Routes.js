import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { LoggedInRoute } from "./LoggedInRoute"
import { connect } from 'react-redux';
import Home from '../src/components/Home';
import Dashboard from '../src/components/Dashboard';

class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <LoggedInRoute exact authenticated = {() => this.props.auth} path="/dashboard" component={Dashboard} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, null)(Routes)