import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router';


export default class BoardsList extends Component {
    constructor(props) {
        super(props);

        this.state = { boardsData: null };

        document.title = 'FG Dojo: Boards';

        $.get('/api/board', function(data) {
            this.setState({ boardsData: JSON.parse(data).boards});
        }.bind(this));
    }

    render() {
        let boardNodes;

        if(this.state.boardsData === null) {
            boardNodes = <li className="list-group-item">
                There are currently no default boards set.
            </li>;
        } else {
            boardNodes = this.state.boardsData.map(function(board) {
                return <Link to={'/b/' + board.name} key={board.name} className="list-group-item">
                    <h5 className="list-group-item-heading">{board.name}</h5>
                    <p className="list-group-item-text">{board.desc}</p>
                </Link>;
            });
        }

        return <div id="boards-list">
            <div className="card-header">
                <Link to={'/b'} className="card-title">
                    Boards
                </Link>
                <div className="btn-group pull-xs-right">
                    <Link to={ {pathname: '/b', query: { show: 'create' }} } className="btn btn-success btn-sm">
                        Create new board
                    </Link>
                </div>
            </div>
            <div className="card-block">
                <div className="list-group">
                    {boardNodes}
                </div>
            </div>
        </div>;
    }
}
