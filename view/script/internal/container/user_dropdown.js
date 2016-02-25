import React from 'react';
import { connect } from 'react-redux';


const UserDropdown = (props) => <div className="dropdown pull-xs-right">
    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
        {props.user.tag}
    </button>
    <div className="dropdown-menu">
        <a href="#" className="dropdown-item">Profile</a>
        <a href="#" className="dropdown-item">Settings</a>
        <a href="/api/logout" className="dropdown-item">Logout</a>
    </div>
</div>;

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(UserDropdown);

