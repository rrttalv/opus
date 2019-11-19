import React, { Component } from 'react';
import {
    ModalBody, ModalHeader, Row, Col, Table
} from 'reactstrap';
import { PropTypes } from 'prop-types';
import { Translate } from 'react-localize-redux';

class UserDetailsModal extends Component {
    render () {
        const { toggle } = this.props;
        const { data } = this.props;
        const mdStyle = { size: 8, offset: 2 };
        return (
            <div>
                <ModalHeader toggle={() => toggle()}><Translate id="modals.user_details.title" data={{ first: data.firstName, last: data.lastName }}></Translate></ModalHeader>
                <ModalBody>
                    <Row>
                        <Col className="center" md={mdStyle}>
                            <span className="bold">{`Email: ${data.email}`}</span>
                        </Col>
                        {data.login_count.length > 0
                            ? <Col className="center" xs={{ size: 12 }} md={{ size: 10, offset: 1 }}>
                                <span className="bold margin-top">Log</span>
                                <Table>
                                    <tbody>
                                        {data.login_count.map((date, i) => (<tr key={i}><td className="center">{new Date(date).toLocaleString()}</td></tr>))}
                                    </tbody>
                                </Table>
                            </Col>
                            : <Col className="center" md={mdStyle}>
                                <Translate id="modals.user_details.no_log"></Translate>
                            </Col>
                        }
                    </Row>
                </ModalBody>
            </div>
        );
    }
}

UserDetailsModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

export default UserDetailsModal;
