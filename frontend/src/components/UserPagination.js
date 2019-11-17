import React, { Component } from 'react'
import { getUsers } from '../actions/userActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class UserPagination extends Component {


    loadPreviousPage = () => {
        const { page } = this.props.users;
        if(page > 0){
            getUsers(page-1);
        }
    }

    render() {
        

        return (
            <div>
                <Pagination>
                    <PaginationItem>
                        <PaginationLink previous onClick={this.loadPreviousPage} href="#">Previous</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#">Next</PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.user,
})

export default connect(mapStateToProps, { getUsers })(UserPagination);