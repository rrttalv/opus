import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

class AppNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }
    
    toggle = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    userAuthenticated(){
        return this.props.auth;
    }

    render() {
        const authLinks = (
            <Fragment>
                <NavItem href="#">
                    <LoginModal></LoginModal>
                </NavItem>
            </Fragment>
        )
        const unauthLinks = (
            <Fragment>
                <NavItem href="#" style={{marginRight: '0.5rem'}}>
                    <RegisterModal></RegisterModal>
                </NavItem>
                <NavItem href="#">
                    <LoginModal></LoginModal>
                </NavItem>
            </Fragment>
        )
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
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {AppNav})(AppNav);