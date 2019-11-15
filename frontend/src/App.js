import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AppNav from "./components/AppNav";

import { Provider } from 'react-redux';
import store from './store';
import { getLoginStatus } from './actions/authActions';
import Home from '../src/components/Home'
import Dashboard from '../src/components/Dashboard'

class App extends Component{

  componentDidMount(){
    store.dispatch(getLoginStatus());
  }

  render(){
    return (
      <Provider store={store}>
        <div>
          <AppNav/>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
        </div>
      </Provider>
    );
  }
}

export default App;