import React, { Component, Fragment } from 'react';
import {
    Collapse, Navbar,
    NavbarToggler, NavbarBrand,
    Nav, NavItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import RegisterModal from './modals/RegisterModal';
import LoginModal from './modals/LoginModal';
import Logout from './Logout';

class AppNav extends Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    userAuthenticated () {
        return this.props.isAuth;
    }

    render () {
        const authLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal href="#"></RegisterModal>
                </NavItem>
                <NavItem href="#">
                    <Logout></Logout>
                </NavItem>
            </Fragment>
        );
        const unauthLinks = (
            <Fragment>
                <NavItem href="#" style={{ marginRight: '0.5rem' }}>
                    <RegisterModal></RegisterModal>
                </NavItem>
                <NavItem href="#">
                    <LoginModal></LoginModal>
                </NavItem>
            </Fragment>
        );
        return (
            <div>
                <Navbar color='dark' dark expand="md" className="mb-5 dark">
                    <NavbarBrand color="light">Firma</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}></NavbarToggler>
                    <Collapse isOpen={this.state.visible} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.userAuthenticated() ? authLinks : unauthLinks}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

AppNav.propTypes = {
    isAuth: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(AppNav);
