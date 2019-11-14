import React, { Component } from 'react'
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

export default class AppNav extends Component {

    render() {
        return (
        <div>
        <Navbar color='dark' dark expand="md" className="mb-5 dark">
            <NavbarBrand color="light">Firma</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.props.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <RegisterModal></RegisterModal>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        </div>
        )
    }
}
