import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';

const formSchema = [    
    {   
    name: "firstName",
    label: "First name",
    required: true
    },
    {   
    name: "lastName",
    label: "Last name",
    required: true
    },
    {   
        name: "email",
        label: "Email address",
        required: true
    },
    {   
        name: "password",
        label: "Password",
        required: true 
    }
]

class RegisterModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
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
    }

    render() {
        return (
            <div>
                <Button onClick={this.show}>Register</Button>
                <Modal 
                isOpen={this.state.modalOpen}
                toggle={this.show}>
                    <ModalHeader toggle={this.hide}>
                        {this.props.title}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            {formSchema.map(({label, name, required}) => (
                                <FormGroup key={label}>
                                    <Label>{label}</Label>
                                    <Input type="text" name={name}></Input>
                                </FormGroup>
                            ))}
                            <Button type="submit" size="md">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect()(RegisterModal)