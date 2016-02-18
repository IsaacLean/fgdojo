import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router';


export default class BoardCreate extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        document.title = 'FG Dojo: Create a new board';
    }

    onSubmit(evt) {
        evt.preventDefault();

        $.post(
            '/api/board',
            $('#board-create-form').serialize()
        );
    }

    render() {
        return <div id="board-create">
             <div className="card-header">
                <Link to={'/b'} className="card-title">
                    Boards
                </Link>
            </div>
            <div className="card-block">
                <h2>Create a new board</h2>
                <form id="board-create-form" onSubmit={this.onSubmit}>
                    <fieldset className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder="not_evil_ryu" className="form-control" />
                    </fieldset>
                    <fieldset className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input type="text" name="desc" placeholder="a board all about the ryu who is not evil enough" className="form-control" />
                    </fieldset>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>;
    }
}
