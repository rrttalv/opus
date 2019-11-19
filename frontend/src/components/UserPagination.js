import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Translate } from 'react-localize-redux';
import { getUsers } from '../actions/userActions';

class UserPagination extends Component {
    loadPreviousPage = () => {
        const { page } = this.props.users;
        if (page > 0) {
            this.props.getUsers(parseInt(page) - 1);
        }
    }

    loadNextPage = () => {
        const { hasMore, page } = this.props.users;
        if (hasMore) {
            this.props.getUsers(parseInt(page) + 1);
        }
    }

    render () {
        const paginationLinkStyle = { color: '#03A9F4' };
        const paginationContainerStyle = { display: 'flex', justifyContent: 'center' };
        const paginationItemStyle = { marginRight: '5px', minWidth: '10%', textAlign: 'center' };
        return (
            <div>
                <Pagination className="margin-top" style={paginationContainerStyle}>
                    <PaginationItem style={paginationItemStyle}>
                        <PaginationLink previous onClick={this.loadPreviousPage} href="#">
                            <span style={paginationLinkStyle}>
                                <Translate id="pagination.prev"></Translate>
                            </span>
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem style={paginationItemStyle}>
                        <PaginationLink next onClick={this.loadNextPage} href="#">
                            <span style={paginationLinkStyle}>
                                <Translate id="pagination.next"></Translate>
                            </span>
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>
            </div>
        );
    }
}

UserPagination.propTypes = {
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    users: state.user
});

export default connect(mapStateToProps, { getUsers })(UserPagination);
