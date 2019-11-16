import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AppNav from "./components/AppNav";
import Routes from "./Routes";


class App extends Component{

  render(){
    return (
      
        <div>
          <AppNav/>
          <Routes/>
        </div>
    );
  }
}

export default App;