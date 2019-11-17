import React, { Component } from 'react'
import { getUsers } from '../actions/userActions';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class UserPagination extends Component {
    loadPreviousPage = () => {
        const { page } = this.props.users;
        if(page > 0){
            this.props.getUsers(parseInt(page)-1);
        }
    }

    loadNextPage = () => {
        const { hasMore, page } = this.props.users;
        if(hasMore){
            this.props.getUsers(parseInt(page)+1);
        }
    }

    render() {
        const paginationLinkStyle = {color: '#03A9F4'};
        const paginationContainerStyle = {display: 'flex', justifyContent: 'center'};
        const paginationItemStyle = {marginRight: '5px', minWidth: '10%', textAlign: 'center'}
        return (
            <div>
                <Pagination className="margin-top" style={paginationContainerStyle}>
                    <PaginationItem style={paginationItemStyle}>
                        <PaginationLink previous onClick={this.loadPreviousPage} href="#">
                            <span style={paginationLinkStyle}>{`Previous`}</span>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem style={paginationItemStyle}>
                        <PaginationLink next onClick={this.loadNextPage} href="#">
                            <span style={paginationLinkStyle}>{`Next`}</span>
                        </PaginationLink>
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