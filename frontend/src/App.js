import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AppNav from "./components/AppNav";
import UserDisplay from "./components/UserDisplay";

import { Provider } from 'react-redux';
import store from './store';

class App extends Component{

  render(){
    return (
      <Provider store={store}>
        <div>
          <AppNav/>
        </div>
      </Provider>
    );
  }
}

export default App;