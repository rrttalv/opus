import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkPasswordToken, resetPassword } from '../../actions/authActions';
import { Button, Container, FormGroup, Form, Label, Input } from 'reactstrap';
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';
import { withRouter } from "react-router-dom";

class UpdatePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            resetToken: '',
            error: false,
            errorMessage: '',
            password: ''
        }
    }

    componentDidUpdate = currentState => {
        if(currentState.error !== this.props.error){
            if(this.props.error.id === 'INVALID_TOKEN'){
                this.setState({error: true, errorMessage: this.props.error.message});
                setTimeout(() => {
                    this.props.clearAllErrors();
                    this.props.history.push('/');
                }, 3000)
            }
            if(this.props.error.id === 'RESET_ERROR'){
                this.setState({error: true, errorMessage: this.props.error.message});
            }
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitNewPassword = e => {
        e.preventDefault();
        this.props.resetPassword(this.state.password, this.props.history)
    }

    componentDidMount = () => {
        let queryParams = this.props.location.search.split("=")[1];
        this.props.checkPasswordToken(queryParams);
    }

    render() {
        const formSchema = [{
            password: 'password',
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
                    <ErrorDisplay error={this.state.error} message={this.state.errorMessage} />
                    <Form style={formStyle}>
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

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, { checkPasswordToken, resetPassword, clearAllErrors })(withRouter(UpdatePassword))