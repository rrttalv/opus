import React, { Component } from 'react'
import { Button, Container, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { verifyEmailAddress } from '../../actions/authActions'
import ErrorDisplay from '../ErrorDisplay';

class VerifyEmail extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            error: false,
            errorMessage: '',
            emailToken: ''
        }
    }

    componentDidMount = () => {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    handleTokenSubmit = (e) => {
        e.preventDefault();

    }

    render() {
        const formSchema = [{
            name: 'emailToken',
            label: 'Token sent via email',
            placeholder: 'Enter token',
            type: 'text'
        }];
        const formStyle = {width: '50%', margin: '0 auto', textAlign: 'left', padding: '2rem 2rem'};
        const buttonStyle = {width: '100%'};
        return (
            <Container style={{textAlign: 'center'}}>
                <h3>{`Verify your email address`}</h3>
                <Form style={formStyle}>
                {formSchema.map((element, key) => (
                    <FormGroup key={key}>
                        <Label>{element.label}</Label>
                        <Input type={element.type} placeholder={element.placeholder} autoComplete="false"></Input>
                    </FormGroup>
                ))}
                <Button style={buttonStyle} onClick={this.handleTokenSubmit} type="submit">{`Verify`}</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {verifyEmailAddress})(VerifyEmail);