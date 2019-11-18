import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkPasswordToken, resetPassword } from '../../actions/authActions';
import { Button, Container, FormGroup, Form, Label, Input } from 'reactstrap';
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';
import { withRouter } from "react-router-dom";
import { PropTypes } from 'prop-types';

class UpdatePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            resetToken: '',
            error: false,
            errorMessage: '',
            password: '',
            passwordToken: ''
        }
    }

    componentDidUpdate = currentState => {
        if(currentState.error !== this.props.error){
            if(this.props.error.id === 'VERIFY_TOKEN_ERROR'){
                this.props.history.push('/');
                this.props.clearAllErrors();
            }
            if(this.props.error.id === 'RESET_ERROR'){
                this.setState({error: true, errorMessage: this.props.error.message});
            }else{
                this.setState({error: false, errorMessage: ''})
            }
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitNewPassword = e => {
        e.preventDefault();
        let requestBody = {
            passwordToken: this.state.passwordToken, 
            password: this.state.password
        }
        this.props.resetPassword(requestBody, this.props.history)
    }

    componentDidMount = () => {
        let tokenFromParams = this.props.location.search.split("=")[1];
        this.setState({passwordToken: tokenFromParams});
        this.props.checkPasswordToken(tokenFromParams);
    }

    render() {
        const formSchema = [{
            name: 'password',
            label: 'New password',
            placeholder: 'Enter a new password',
            type: 'password'
        }];
        const formStyle = {width: '50%', margin: '0 auto', textAlign: 'left', padding: '2rem 2rem'};
        const buttonStyle = {width: '100%'};
        return (
            <div>
                <Container style={{textAlign: 'center'}}>
                        <h3>{`${'Reset password'}`}</h3>
                    <Form style={formStyle}>
                    <ErrorDisplay error={this.state.error} message={this.state.errorMessage} />
                        {formSchema.map((element, i) => (
                            <FormGroup key={i}>
                                <Label>{element.label}</Label>
                                <Input
                                    name={element.name}
                                    type={element.type}
                                    placeholder={element.placeholder}
                                    onChange={this.handleChange}
                                ></Input>         
                            </FormGroup>
                        ))}
                    <Button style={buttonStyle} onClick={this.submitNewPassword} type="submit">{`Submit Password`}</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

UpdatePassword.propTypes = {
    clearAllErrors: PropTypes.func.isRequired,
    checkPasswordToken: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    error: PropTypes.object
}

const mapStateToProps = state => ({
    error: state.error
})

export default connect(mapStateToProps, { checkPasswordToken, resetPassword, clearAllErrors })(withRouter(UpdatePassword))