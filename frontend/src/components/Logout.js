import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Translate } from 'react-localize-redux';
import { logout } from '../actions/authActions';

class Logout extends Component {
    handleLogout = () => {
        this.props.logout();
    }

    render () {
        return (
            <NavLink onClick={() => this.handleLogout()}>
                <Translate id="nav.out"></Translate>
            </NavLink>
        );
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
};

export default connect(null, { logout })(Logout);
