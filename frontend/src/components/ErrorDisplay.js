import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class ErrorDisplay extends Component {
    constructor (props) {
        super(props);
        this.state = {
            error: false,
            message: ''
        };
    }


    shouldComponentUpdate (nextProps) {
        if (this.props.message === nextProps.message) {
            return false;
        }

        this.setState({ error: nextProps.error, message: nextProps.message });
        return true;
    }

    render () {
        return (
            <div>
                { this.props.error ? <Alert color="danger">{this.props.message}</Alert> : null }
            </div>
        );
    }
}

export default ErrorDisplay;
