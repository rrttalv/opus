import React, { Component } from 'react'
import { withLocalize } from "react-localize-redux";

class LanguageToggle extends Component {
    constructor(props){
        super(props);
        this.props.setActiveLanguage('ee')
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default withLocalize(LanguageToggle);