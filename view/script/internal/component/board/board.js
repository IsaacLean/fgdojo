import $ from 'jquery';
import React, { Component } from 'react';


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

        if(this.state.boardData) {
            boardDesc = this.state.boardData.desc;
        }

        return <div id="board">
            <h2>{this.props.name}</h2>
            <p>{boardDesc}</p>
        </div>;
    }
}
