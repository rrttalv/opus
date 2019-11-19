import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, NavLink, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom'
import { Translate, getActiveLanguage } from "react-localize-redux";

class LoginModal extends Component {
    componentDidUpdate = errorState => {
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

    generateFormSchema = () => {
        if(this.props.lang.code === "ee"){
            return [
                {   
                    name: "email",
                    label: "Emaili aadress",
                    placeholder: "Sinu meiliaadress",
                    type: "email"
                },
                {   
                    name: "password",
                    label: "Parool",
                    placeholder: "Valitud parool",
                    type: "password"
                }
            ]
        }else{
            return [
                {   
                    name: "email",
                    label: "Email address",
                    placeholder: "Registered email address",
                    type: "email"
                },
                {   
                    name: "password",
                    label: "Password",
                    placeholder: "Selected password",
                    type: "password"
                }
            ]
        }
    }

    render() {
        const formSchema = this.generateFormSchema();
        return (
            <div>
            <NavLink onClick={this.toggle}><Translate id="nav.log.action"></Translate></NavLink>
            <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>
                    <Translate id="nav.log.title"></Translate>
                </ModalHeader>
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
                <ModalFooter style={{justifyContent: 'space-between'}}>
                    <Link onClick={this.toggle} style={{color: `#454545`}} to="/forgot">
                        <Translate id="nav.log.secondary_action"></Translate>
                    </Link>
                    <Button type="submit" size="md" onClick={this.handleSubmit}><Translate id="nav.log.action"></Translate></Button>
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
    error: PropTypes.object.isRequired,
    lang: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated,
    error: state.error,
    lang: getActiveLanguage(state.localize)
})

export default connect(mapStateToProps, {loginUser, clearAllErrors})(LoginModal)