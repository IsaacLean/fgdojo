import React, { Component } from 'react';

export default class BoardsCreate extends Component {
    constructor(props) {
        super(props);

        document.title = 'FG Dojo: Boards';
    }

    render() {
        return <div id="boards-create">
            <h2>Boards</h2>
            <ul>
                <li>i am a board lol</li>
            </ul>
        </div>;
    }
}
