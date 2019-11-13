import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

export default class App extends Component{
  render(){
    return (
      <div className="container-fluid">
        <Navbar/>
      </div>
    );
  }
}
