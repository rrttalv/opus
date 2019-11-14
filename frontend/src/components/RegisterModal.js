import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Form, Label, Input, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions'
class RegisterModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            title: 'Register',
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    toggle = () => {
        console.log(this.state)
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    handleSubmit = e => {
        e.preventDefault()
        const newUser = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }
        this.props.registerUser(newUser);
        this.toggle();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const formSchema = [    
            {   
                name: "firstName",
                label: "First name",
                placeholder: "Your first name",
                required: true,
                type: "text"
            },
            {   
                name: "lastName",
                label: "Last name",
                placeholder: "Your last name",
                required: true,
                type: "text"
            },
            {   
                name: "email",
                label: "Email address",
                placeholder: "Your email address",
                required: true,
                type: "text"
            },
            {   
                name: "password",
                label: "Password",
                placeholder: "Select a password",
                required: true,
                type: "password"
            }
        ]
        return (
            <div>
                <NavLink onClick={this.toggle}>Register</NavLink>
                <Modal 
                isOpen={this.state.modalOpen}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {this.state.title}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            {formSchema.map(({label, name, type, placeholder, required}) => (
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
                        <Button type="submit" onClick={this.handleSubmit} size="md">Register</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {registerUser})(RegisterModal)