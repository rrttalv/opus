import React, { Component } from 'react'
import { Button, Container, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/authActions';

class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
        }
    }

    componentDidUpdate = () => {
        console.log(this.props.auth)
        if(this.props.auth.hasReset){
            this.props.history.push('/');
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleEmailSubmit = (e) => {
        e.preventDefault();
        this.props.resetPassword(this.state)
    }

    render() {
        const formSchema = [{
            name: 'email',
            label: 'Login email',
            placeholder: 'Enter your login email',
            type: 'email'
        }];
        const formStyle = {width: '50%', margin: '0 auto', textAlign: 'left', padding: '2rem 2rem'};
        const buttonStyle = {width: '100%'};
        return (
            <Container style={{textAlign: 'center'}}>
                <h3>{`Reset account password`}</h3>
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
                <Button style={buttonStyle} onClick={this.handleEmailSubmit} type="submit">{`Reset Password`}</Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {resetPassword})(ForgotPassword)