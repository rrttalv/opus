import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions'
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

    handleSubmit = e => {
        e.preventDefault()
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userInfo);
        this.hide();
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
            <Button onClick={this.show}>Login</Button>
            <Modal isOpen={this.state.modalOpen} toggle={this.show}>
                <ModalHeader toggle={this.hide}>{this.state.title}</ModalHeader>
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
    hasAuth: state
})

export default connect(mapStateToProps, {loginUser})(LoginModal)