import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';

export default class UserDisplayModal extends Component {
    render() {
        const { firstName, lastName, login_count, email } = this.props;
        return (
            <div>
                <Modal isOpen={this.props.showModal}>
                    <ModalHeader>

                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>{firstName}</Col>
                            <Col>{lastName}</Col>
                            <Col>{login_count}</Col>
                            <Col>{email}</Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
