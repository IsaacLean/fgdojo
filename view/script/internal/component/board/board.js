import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router';

import PostCreate from './post_create';
import PostsList from './posts_list';


export default class Board extends Component {
    constructor(props) {
        super(props);

        this.state = { boardData: null };

        $.get('/api/board/' + this.props.name, function(data) {
            this.setState({ boardData: JSON.parse(data)});
        }.bind(this))
            .fail(function() {
                this.props.router.push({ pathname: '/404' });
            }.bind(this));

        document.title = 'FG Dojo: ' + this.props.name;
    }

    render() {
        let boardDesc = '';
        let comp;

        if(this.state.boardData) {
            boardDesc = this.state.boardData.desc;
        }

        if(this.props.post.post_id && this.props.post.post_name) {
            // TODO: request post & render here
            comp = <div>i'm supposed to be the post</div>;
        } else if(this.props.query.show === 'new_post') {
            comp = <PostCreate board={this.props.name} />;
        } else {
            comp = <PostsList board={this.props.name} />;
        }

        let boardUrl = '/b/' + this.props.name;

        return <div id="board">
            <div className="card-header">
                <Link to={boardUrl}>
                    {this.props.name}
                </Link>
                <i>{boardDesc}</i>
                <Link to={ {pathname: boardUrl, query: { show: 'new_post' }} } className="btn btn-success btn-sm pull-xs-right">
                    Create new post
                </Link>
            </div>
            <div className="card-block">
                {comp}
            </div>
        </div>;
    }
}
