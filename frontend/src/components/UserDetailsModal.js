import React, { Component } from 'react'
import { ModalBody, ModalHeader, Row, Col } from 'reactstrap';

class UserDetailsModal extends Component {
    
    render() {
        const { toggle } = this.props;
        const { data } = this.props;
        return (
            <div>
                <ModalHeader toggle={() => toggle()}>{`Viewing ${data.firstName} ${data.lastName}`}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col className="center" md={{size: 8, order: 1, offset: 2}}>
                            <span className="bold">{`Contact email: ${data.email}`}</span>
                            </Col>
                    </Row>
                </ModalBody>
            </div>
        )
    }
}

export default UserDetailsModal;