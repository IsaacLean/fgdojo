import React from 'react';


export default (props) => {
    return <div className="dropdown pull-xs-right">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
            User DD
        </button>
        <div className="dropdown-menu">
            <a href="#" className="dropdown-item">Profile</a>
            <a href="#" className="dropdown-item">Settings</a>
            <a href="/api/logout" className="dropdown-item">Logout</a>
        </div>
    </div>;
};
