import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
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

    render() {

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
                    {unauthLinks}
                </Nav>
            </Collapse>
        </Navbar>
        </div>
        )
    }
}

export default AppNav;