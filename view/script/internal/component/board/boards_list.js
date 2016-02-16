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
            boardNodes = <li>There are currently no default boards set.</li>;
        } else {
            boardNodes = this.state.boardsData.map(function(board) {
                return <li key={board.name} className="list-group-item">
                    <Link to={'/b/' + board.name}>
                        {board.name}
                    </Link>
                </li>;
            });
        }

        return <div id="boards-create">
            <h2>Boards</h2>
            <ul className="list-group">
                {boardNodes}
            </ul>
        </div>;
    }
}
