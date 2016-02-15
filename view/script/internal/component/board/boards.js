import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import BoardsList from './boards_list';
import BoardsCreate from './boards_create';

export default class Boards extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        let pathLen = this.props.routes.length;
        let comp;

        // /b GET queries
        if(pathLen === 2) {
            let { query } = this.props.location;

            switch(query.show) {
            case 'create':
                comp = <BoardsCreate />;
                break;
            case 'new':
                document.title = 'FG Dojo: New Boards';
                comp = <div>new comp</div>;
                break;
            case 'popular':
                document.title = 'FG Dojo: Popular Boards';
                comp = <div>popular comp</div>;
                break;
            default:
                comp = <BoardsList />;
            }
        }

        // if(this.props.routes.length === 3) {
        //     if(this.props.routes[2].path === 'create') {
        //         comp = <div>create comp</div>;
        //     }
        // } else {
        //     comp = <div>board comp</div>;
        // }

        return <div>
            {comp}
            <Link to={'/b'} className="btn btn-primary">
                Boards list
            </Link>
            <Link to={ {pathname: '/b', query: { show: 'create' }} } className="btn btn-primary">
                Create new board
            </Link>
            <Link to={'/'} className="btn btn-secondary">
                Go to root
            </Link>
        </div>;
    }
}
