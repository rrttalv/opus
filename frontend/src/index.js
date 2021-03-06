import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { getLoginStatus } from './actions/authActions';

export const history = createBrowserHistory();
export const componentDidMount = () => {
    store.dispatch(getLoginStatus());
};
componentDidMount();

ReactDOM.render(
    <LocalizeProvider store={store}>
        <Provider store={store}>
            <Router history={history}><App /></Router>
        </Provider>
    </LocalizeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
