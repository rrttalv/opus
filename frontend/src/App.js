import React, { Component } from 'react';
import './App.css';
import { renderToStaticMarkup } from 'react-dom/server';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withLocalize } from 'react-localize-redux';
import globalTranslations from './translations/global.json';
import AppNav from './components/AppNav';
import Routes from './Routes';
import AppFooter from './components/AppFooter';

class App extends Component {
    constructor (props) {
        super(props);
        this.props.initialize({
            languages: [
                { name: 'English', code: 'en' },
                { name: 'Estonian', code: 'ee' }
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup }
        });
    }

    render () {
        return (

            <div>
                <AppNav/>
                <Routes/>
                <AppFooter />
            </div>
        );
    }
}

export default withLocalize(App);
