import React, { Component } from 'react'
import { Spinner } from 'reactstrap';

class Loading extends Component {
    render() {
        return (
            <div className="center">
                <Spinner color="info" style={{height: "4rem", width: "4rem"}}></Spinner>
            </div>
        )
    }
}

export default Loading;