import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup, Form, Label, Input, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';
import { addUser } from '../../actions/userActions';
import { PropTypes } from 'prop-types';
import { Translate, getActiveLanguage } from "react-localize-redux";

class RegisterModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            error: false,
            errorMessage: ''
        }
    }

    componentDidUpdate(compState) {
        if(this.props.error !== compState.error){
            if(this.props.error.id === 'REGISTER_FAIL'){
                this.setState({error: true, errorMessage: this.props.error.message})
            }else{
                this.setState({error: false, errorMessage: ''})
            }
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
        const newUser = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        }
        if(this.props.isAuth){
            this.props.addUser(newUser, this.toggle, this.props.page);
        }else{
            this.props.registerUser(newUser, this.toggle);
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getFormSchema = () => {
        if(this.props.lang.code === "ee"){
            return [    
                {   
                    name: "firstName",
                    label: "Eesnimi",
                    placeholder: "Joonas",
                    type: "text"
                },
                {   
                    name: "lastName",
                    label: "Perenimi",
                    placeholder: "Magi",
                    type: "text"
                },
                {   
                    name: "email",
                    label: "Emaili aadress",
                    placeholder: "Sisselogimise meiliaadress",
                    type: "email"
                },
                {   
                    name: "password",
                    label: "Parool",
                    placeholder: "Vali parool",
                    type: "password"
                }
            ]
        }else{
            return [    
                {   
                    name: "firstName",
                    label: "First name",
                    placeholder: "John",
                    type: "text"
                },
                {   
                    name: "lastName",
                    label: "Last name",
                    placeholder: "Smith",
                    type: "text"
                },
                {   
                    name: "email",
                    label: "Email address",
                    placeholder: "Login email address",
                    type: "email"
                },
                {   
                    name: "password",
                    label: "Password",
                    placeholder: "Select a password",
                    type: "password"
                }
            ]
        }
    }

    render() {
        const formSchema = this.getFormSchema();
        return (
            <div>
                <NavLink onClick={this.toggle}>
                    {this.props.isAuth ? 
                    <Translate id="nav.add.action"></Translate> :
                    <Translate id="nav.reg.action"></Translate>}
                </NavLink>
                <Modal 
                isOpen={this.state.modalOpen}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                    {this.props.isAuth ? 
                    <Translate id="nav.add.title"></Translate> : 
                    <Translate id="nav.reg.title"></Translate>}
                    </ModalHeader>
                    <ModalBody>
                    <ErrorDisplay error={this.state.error} message={this.state.errorMessage}></ErrorDisplay>
                        <Form>
                            {formSchema.map(({label, name, type, placeholder}) => (
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
                        <Button type="submit" onClick={this.handleSubmit} size="md">
                            {this.props.isAuth ? 
                            <Translate id="nav.add.action"></Translate> : 
                            <Translate id="nav.reg.action"></Translate>}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

RegisterModal.propTypes = {
    clearAllErrors: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
    lang: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    error: state.error,
    isAuth: state.auth.isAuthenticated,
    page: state.user.page,
    lang: getActiveLanguage(state.localize)
})

export default connect(mapStateToProps, {registerUser, clearAllErrors, addUser})(RegisterModal)