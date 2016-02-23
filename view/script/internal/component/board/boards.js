import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Board from './board';
import BoardsList from './boards_list';
import BoardCreate from './board_create';


export default class Boards extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        let comp;

        if(this.props.params.board_name) {
            comp = <Board
                query={this.props.location.query}
                name={this.props.params.board_name}
                post={{
                    post_id: this.props.params.post_id,
                    post_name: this.props.params.post_name
                }}
                router={this.context.router}
            />;
        } else {
            let { query } = this.props.location;

            switch(query.show) {
            case 'create':
                comp = <BoardCreate />;
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

        return <div id="boards">
            {comp}
        </div>;
    }
}
