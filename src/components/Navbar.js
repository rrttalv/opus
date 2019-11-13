import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Router>
                <div className="container">
                    <Link to='/' className="logo" style={{ textDecoration: 'none', color: '#454545' }}>Firma</Link>
                    
                </div>
                </Router>
            </nav>
        )
    }
}