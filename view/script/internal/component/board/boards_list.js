import $ from 'jquery';
import React, { Component } from 'react';

export default class BoardsCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { boardData: null };

        document.title = 'FG Dojo: Boards';

        $.get('/api/board', function(data) {
            this.setState({ boardData: JSON.parse(data).boards});
        }.bind(this));
    }

    render() {
        let boardNodes;

        if(this.state.boardData === null) {
            boardNodes = <li>There are currently no default boards set.</li>;
        } else {
            boardNodes = this.state.boardData.map(function(board) {
                return <li key={board.name}>
                    {board.name}
                </li>;
            });
        }

        return <div id="boards-create">
            <h2>Boards</h2>
            <ul>
                {boardNodes}
            </ul>
        </div>;
    }
}
