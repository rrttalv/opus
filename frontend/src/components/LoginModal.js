import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

const formSchema = [
    {   
        name: "email",
        label: "Email address",
        placeholder: "Registered email address",
        required: true
    },
    {   
        name: "password",
        label: "Password",
        placeholder: "Selected password",
        required: true 
    }
]

class LoginModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalopen: false,
            title: 'Login',
            email: '',
            password: ''
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
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div>
            <Button onClick={this.show}>Login</Button>
            <Modal isOpen={this.state.modalOpen} toggle={this.show}>
                <ModalHeader toggle={this.hide}>{this.state.title}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        {formSchema.map(({label, placeholder, name}) => (
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
                    <Button type="submit" size="md">Login</Button>
                </ModalFooter>
            </Modal>
            </div>
        )
    }
}

export default connect()(LoginModal)