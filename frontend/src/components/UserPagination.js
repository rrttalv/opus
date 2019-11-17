import React, { Component } from 'react'
import { getUsers, deleteUser } from '../actions/userActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class UserPagination extends Component {
    render() {
        return (
            <div>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink previous href="#"></PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#"></PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state,
})

export default connect(mapStateToProps, { getUsers, deleteUser })(UserPagination);