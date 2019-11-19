import React, { Component } from 'react';
import {
    Button, Container, FormGroup, Form, Label, Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { Translate, getActiveLanguage } from 'react-localize-redux';
import { verifyEmailAddress } from '../../actions/authActions';
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';

class VerifyEmail extends Component {
    componentDidUpdate = (currentState) => {
        if (currentState.error !== this.props.error) {
            if (this.props.error.id === 'VERIFY_ERROR') {
                this.setState({ error: true, errorMessage: this.props.error.message });
            }
            else {
                this.setState({ error: false, errorMessage: '' });
            }
        }
        if (currentState.auth.hasVerified !== this.props.auth.hasVerified) {
            this.props.history.push('/');
        }
    }

    constructor (props) {
        super(props);
        this.state = {
            error: false,
            errorMessage: '',
            emailToken: ''
        };
    }

    handleTokenSubmit = (e) => {
        e.preventDefault();
        this.props.verifyEmailAddress(this.state.emailToken, this.props.history);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    generateFormSchema = () => {
        if (this.props.lang.code === 'ee') {
            return [{
                name: 'emailToken',
                label: 'Emailile saadetud kood',
                placeholder: 'Sisesta kood',
                type: 'text'
            }];
        }
        return [{
            name: 'emailToken',
            label: 'Token sent via email',
            placeholder: 'Enter token',
            type: 'text'
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
                <h3><Translate id="verify.title"></Translate></h3>
                <Form style={formStyle}>
                    <ErrorDisplay error={this.state.error} message={this.state.errorMessage}></ErrorDisplay>
                    {formSchema.map((element, key) => (
                        <FormGroup key={key}>
                            <Label>{element.label}</Label>
                            <Input
                                name={element.name}
                                type={element.type}
                                onChange={this.handleChange}
                                placeholder={element.placeholder}
                            ></Input>
                        </FormGroup>
                    ))}
                    <Button style={buttonStyle} onClick={this.handleTokenSubmit} type="submit"><Translate id="buttons.verify"></Translate></Button>
                </Form>
            </Container>
        );
    }
}

VerifyEmail.propTypes = {
    verifyEmailAddress: PropTypes.func.isRequired,
    clearAllErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
    lang: getActiveLanguage(state.localize)
});

export default connect(mapStateToProps, { verifyEmailAddress, clearAllErrors })(withRouter(VerifyEmail));
