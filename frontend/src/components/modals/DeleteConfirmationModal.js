import React, { Component } from 'react'
import { ModalBody, ModalFooter, Row, Col, Button } from 'reactstrap';

export default class DeleteConfirmationModal extends Component {

    render() {
        const { toggle } = this.props;
        const { data } = this.props;
        return (
            <div>
                <ModalBody>
                    <h5>{`Do you want to delete ${data.firstName} ${data.lastName}?`}</h5>
                </ModalBody>
                <ModalFooter>
                    <Button size="md" color="danger">{`Delete`}</Button>
                    <Button onClick={toggle} color="info" size="md">{`Cancel`}</Button>
                </ModalFooter>
            </div>
        )
    }
}
