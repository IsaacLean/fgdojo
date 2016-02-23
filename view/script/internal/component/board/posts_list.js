import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router';


export default class PostsList extends Component {
    constructor(props) {
        super(props);

        this.state = { postsData: null };

        $.get('/api/board/' + this.props.board + '?post=new', function(data) {
            this.setState({ postsData: JSON.parse(data).posts});
        }.bind(this))
            .fail(function() {
                // TODO: make better error handling
                console.error('router');
            });
        
    }

    render() {
        let postNodes;

        if(this.state.postsData === null || this.state.postsData.length === 0) {
            postNodes = <li className="list-group-item">
                There are currently no posts in this board.
            </li>;
        } else {
            postNodes = this.state.postsData.map(function(post) {
                return <Link to={'/b/' + this.props.board + '/' + post.id + '/' + encodeURIComponent(post.title)} key={post.title} className="list-group-item">
                    <h5 className="list-group-item-heading">{post.title}</h5>
                </Link>;
            }.bind(this));
        }

        return <div id="posts-list">
            <div className="card-block">
                <div className="list-group">
                    {postNodes}
                </div>
            </div>
        </div>;
    }
}
