import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { LoggedInRoute } from "./LoggedInRoute"
import { connect } from 'react-redux';
import Home from '../src/components/Home';
import VerifyEmail from '../src/components/unauth/VerifyEmail';
import ForgotPassword from '../src/components/unauth/ForgotPassword';
import Dashboard from '../src/components/Dashboard';

class Routes extends Component {
    render() {
        const { auth, loading } = this.props;
        if(!loading){
            return (
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/verify" component={VerifyEmail} />
                    <Route exact path="/forgot" component={ForgotPassword} />
                    <LoggedInRoute exact authenticated = {() => auth} path="/dashboard" component={Dashboard} />
                </div>
            )
        }else{
            return (
            <div></div>
            )
        }


    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isAuthenticated,
        loading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, null, null, {pure: false})(Routes)