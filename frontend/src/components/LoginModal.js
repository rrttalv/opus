import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, NavLink, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions'
class LoginModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            title: 'Login',
            email: '',
            password: ''
        }
    }

    toggle = () => {
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
        this.toggle();
        console.log(this.props)
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

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {loginUser})(LoginModal)