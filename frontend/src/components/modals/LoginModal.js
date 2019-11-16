import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, NavLink, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';
import { PropTypes } from 'prop-types';

class LoginModal extends Component {
    componentDidUpdate(errorState) {
        if(this.props.error !== errorState.error){
            if(this.props.error.id === 'LOGIN_FAIL'){
                this.setState({error: true, errorMessage: this.props.error.message});
            }else{
                this.setState({error: false})
            }
        }
        if(this.state.modalOpen){
            if(this.props.isAuth){
                this.props.history.push('/dashboard')
                this.toggle();
            }
        }
    }

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            title: 'Login',
            email: '',
            password: '',
            error: false,
            errorMessage: ''
        }
    }

    toggle = () => {
        this.props.clearAllErrors();
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    handleSubmit = e => {
        e.preventDefault()
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userInfo);
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const formSchema = [
            {   
                name: "email",
                label: "Email address",
                placeholder: "Registered email address",
                required: true,
                type: "text"
            },
            {   
                name: "password",
                label: "Password",
                placeholder: "Selected password",
                required: true,
                type: "password"
            }
        ]
        return (
            <div>
            <NavLink onClick={this.toggle}>Login</NavLink>
            <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                <ModalBody>
                <ErrorDisplay error={this.state.error} message={this.state.errorMessage}></ErrorDisplay>
                    <Form>
                        {formSchema.map(({label, type, placeholder, name}) => (
                            <FormGroup key={label}>
                                <Label>{label}</Label>
                                <Input 
                                    type={type} 
                                    name={name}
                                    placeholder={placeholder}
                                    onChange={this.handleChange}></Input>
                            </FormGroup>
                        ))}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" size="md" onClick={this.handleSubmit}>Login</Button>
                </ModalFooter>
            </Modal>
            </div>
        )
    }
}

LoginModal.propTypes = {
    clearAllErrors: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    isAuth: PropTypes.bool,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {loginUser, clearAllErrors})(LoginModal)