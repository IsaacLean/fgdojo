import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router';

import PostCreate from './post_create';


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

        if(this.props.query.show === 'new_post') {
            comp = <div>i'm the post creation form</div>;
        } else {
            comp = <div>i'm the post list</div>;
        }

        let url = '/b/' + this.props.name;

        return <div id="board">
            <div className="card-header">
                <Link to={url}>
                    {this.props.name}
                </Link>
                <i>{boardDesc}</i>
                <Link to={ {pathname: url, query: { show: 'new_post' }} } className="btn btn-success btn-sm pull-xs-right">
                    Create new post
                </Link>
                
            </div>
            <div className="card-block">
                {comp}
            </div>
        </div>;
    }
}
