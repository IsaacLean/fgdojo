import React from 'react';


export default (props) => <div className="dropdown pull-xs-right">
    <button
        className="btn btn-secondary dropdown-toggle"
        data-toggle="dropdown"
        onClick={props.clickTag}
        type="button"
    >
        Lean
    </button>
    <div className="dropdown-menu">
        <a className="dropdown-item" href="#">Profile</a>
        <a className="dropdown-item" href="#" >Settings</a>
        <a className="dropdown-item" href="/api/logout">Logout</a>
    </div>
</div>;
