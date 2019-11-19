import React, { Component } from 'react'
import { NavLink } from 'reactstrap';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Translate } from "react-localize-redux";
class Logout extends Component {

    handleLogout = () => {
        this.props.logout()
    }

    render() {
        return (
            <NavLink onClick={() => this.handleLogout()}>
                <Translate id="nav.out"></Translate>
            </NavLink>
        )
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)