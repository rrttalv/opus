import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

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

    show = () => {
        this.setState({modalOpen: true});
    }

    hide = () => {
        this.setState({modalOpen: false})
    }

    onSubmit = e => {
        e.preventDefault()
        const newUser = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }
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
                required: true
            },
            {   
                name: "lastName",
                label: "Last name",
                placeholder: "Your last name",
                required: true
            },
            {   
                name: "email",
                label: "Email address",
                placeholder: "Your email address",
                required: true
            },
            {   
                name: "password",
                label: "Password",
                placeholder: "Select a password",
                required: true 
            }
        ]
        return (
            <div>
                <Button onClick={this.show}>Register</Button>
                <Modal 
                isOpen={this.state.modalOpen}
                toggle={this.show}>
                    <ModalHeader toggle={this.hide}>
                        {this.state.title}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            {formSchema.map(({label, name, placeholder, required}) => (
                                <FormGroup key={label}>
                                    <Label>{label}</Label>
                                    <Input 
                                    type="text" 
                                    name={name}
                                    placeholder={placeholder}
                                    onChange={this.handleChange}></Input>
                                </FormGroup>
                            ))}
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" size="md">Register</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect()(RegisterModal)