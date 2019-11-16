import React, { Component } from 'react'
import { Button } from 'reactstrap';

export default class ReusableButton extends Component {
    render() {
        return (
        <Button>{ this.props.text }</Button>
        )
    }
}
