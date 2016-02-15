import $ from 'jquery';
import React, { Component } from 'react';

import util from '../../util';

export default class BoardsCreate extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        document.title = 'FG Dojo: Create a new board';
    }

    onSubmit(evt) {
        evt.preventDefault();

        let data = util.getFormData('#boards-create-form');
        data.creator = 'billy';
        data = $.param(data);

        $.post(
            '/api/board',
            data
        );
    }

    render() {
        return <div id="boards-create">
            <h2>Create a new board</h2>
            <form id="boards-create-form" onSubmit={this.onSubmit}>
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
        </div>;
    }
}
