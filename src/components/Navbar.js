import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Router>
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to='/' className="nav-link" style={{ textDecoration: 'none', color: '#454545' }}>Firma</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-sm-2">
                            <li className="navbar-item">
                                <Link to='/' className="nav-link" style={{ textDecoration: 'none', color: '#454545' }}>Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to='/' className="nav-link" style={{ textDecoration: 'none', color: '#454545' }}>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                </Router>
            </nav>
        )
    }
}