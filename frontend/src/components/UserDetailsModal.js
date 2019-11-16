import React, { Component } from 'react'
import { ModalBody, ModalHeader, Row, Col } from 'reactstrap';

class UserDetailsModal extends Component {
    
    render() {
        const { toggle } = this.props;
        const { data } = this.props;
        const mdStyle = {size: 8, order: 1, offset: 2}
        return (
            <div>
                <ModalHeader toggle={() => toggle()}>{`Viewing ${data.firstName} ${data.lastName}`}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col className="center" md={mdStyle}>
                            <span className="bold">{`Contact email: ${data.email}`}</span>
                        </Col>
                        {data.login_count.length > 0 ?
                        <Col xs={{size: 12}} md={{size: 10, offset: 1}}></Col> :
                        <Col className="center" md={mdStyle}>
                            <span>{`This user has not logged in yet`}</span>
                        </Col>
                        }
                    </Row>
                </ModalBody>
            </div>
        )
    }
}

export default UserDetailsModal;