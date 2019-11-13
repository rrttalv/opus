import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import AppNav from "./components/AppNav";

export default class App extends Component{
  render(){
    return (
      <div>
        <AppNav/>
      </div>
    );
  }
}
