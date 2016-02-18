import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Feed extends Component {
    constructor(props) {
        super(props);

        document.title = 'FG Dojo: Feed';
    }

    render() {
        return <div id="feed">
            <div className="card-header">
                <Link to={'/feed'} className="card-title">Feed</Link>
            </div>
            <div className="card-block">
                coming soon
            </div>
        </div>;
    }
}
