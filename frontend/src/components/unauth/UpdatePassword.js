import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkPasswordToken } from '../../actions/authActions'
import ErrorDisplay from '../ErrorDisplay';
import { clearAllErrors } from '../../actions/errorActions';
class UpdatePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            resetToken: ''
        }
    }

    componentDidMount = () => {
        let queryParams = this.props.location.search.split("=")[1];
        this.setState({resetToken: queryParams});
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { checkPasswordToken })(UpdatePassword)