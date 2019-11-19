import React, { Component } from 'react';
import {
    Button, Container, FormGroup, Form, Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Translate, getActiveLanguage } from 'react-localize-redux';
import { sendResetPasswordRequest } from '../../actions/authActions';

class ForgotPassword extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleEmailSubmit = (e) => {
        e.preventDefault();
        this.props.sendResetPasswordRequest(this.state, this.props.history);
    }

    generateFormSchema = () => {
        if (this.props.lang.code === 'ee') {
            return [{
                name: 'email',
                label: 'Registreeritud meiliaadress',
                placeholder: 'Sisesta meiliaadress',
                type: 'email'
            }];
        }
        return [{
            name: 'email',
            label: 'Login email',
            placeholder: 'Enter your login email',
            type: 'email'
        }];
    }

    render () {
        const formSchema = this.generateFormSchema();
        const formStyle = {
            width: '50%', margin: '0 auto', textAlign: 'left', padding: '2rem 2rem'
        };
        const buttonStyle = { width: '100%' };
        return (
            <Container style={{ textAlign: 'center' }}>
                <h3><Translate id="reset.title"></Translate></h3>
                <Form style={formStyle}>
                    {formSchema.map((element, i) => (
                        <FormGroup key={i}>
                            <Label>
                                {element.label}
                            </Label>
                            <Input
                                name={element.name}
                                placeholder={element.placeholder}
                                type={element.type}
                                onChange={this.handleChange}
                            ></Input>
                        </FormGroup>
                    ))}
                    <Button style={buttonStyle} onClick={this.handleEmailSubmit} type="submit"><Translate id="buttons.reset"></Translate></Button>
                </Form>
            </Container>
        );
    }
}

ForgotPassword.propTypes = {
    sendResetPasswordRequest: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    lang: getActiveLanguage(state.localize)
});

export default connect(mapStateToProps, { sendResetPasswordRequest })(withRouter(ForgotPassword));
