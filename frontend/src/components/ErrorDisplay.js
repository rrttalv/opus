import React, { Component } from 'react'
import { Alert } from 'reactstrap';

class ErrorDisplay extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: false,
            message: false
        }
    }

    shouldComponentUpdate(nextProps){
        return this.props.error !== nextProps.error
    }
    render() {
        return (
            <div>
                { this.props.error ? <Alert color="danger">{this.props.message}</Alert> : null }
            </div>
        )
    }
}

export default ErrorDisplay