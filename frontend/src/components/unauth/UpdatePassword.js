import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkPasswordToken, resetPassword } from '../../actions/authActions';
import { Button, Container, FormGroup, Form, Label, Input } from 'reactstrap';
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';
import { withRouter } from "react-router-dom";

class UpdatePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            resetToken: '',
            error: false,
            errorMessage: ''
        }
    }

    componentDidUpdate = currentState => {
        if(currentState.error !== this.props.error && this.props.error.id === 'RESET_ERROR'){
            this.setState({error: true, errorMessage: this.props.error.message})
            setTimeout(() => {
                this.props.history.push('/');
            }, 3000)
        }
    }

    componentDidMount = () => {
        let queryParams = this.props.location.search.split("=")[1];
        this.props.checkPasswordToken(queryParams);
    }

    render() {
        return (
            <div>
                <Container>
                    <ErrorDisplay error={this.state.error} message={this.state.errorMessage} />
                    <Form>
                        <FormGroup>
                            
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, { checkPasswordToken, resetPassword })(withRouter(UpdatePassword))