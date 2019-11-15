import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AppNav from "./components/AppNav";
import Routes from "./Routes";

import { Provider } from 'react-redux';
import store from './store';
import { getLoginStatus } from './actions/authActions';

class App extends Component{

  componentDidMount(){
    store.dispatch(getLoginStatus());
  }

  render(){
    return (
      <Provider store={store}>
        <div>
          <AppNav/>
          <Routes/>
        </div>
      </Provider>
    );
  }
}

export default App;