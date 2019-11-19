import React, { Component } from 'react';
import { withLocalize } from 'react-localize-redux';
import { Button } from 'reactstrap';

class LanguageToggle extends Component {
    changeLang = (lang) => {
        this.props.setActiveLanguage(lang);
    }

    render () {
        const buttonStyle = { marginRight: '10px' };
        return (
            <div>
                <Button style={buttonStyle} onClick={() => this.changeLang('ee')}>
                    EE
                </Button>
                <Button style={buttonStyle} onClick={() => this.changeLang('en')}>
                    EN
                </Button>
            </div>
        );
    }
}

export default withLocalize(LanguageToggle);
