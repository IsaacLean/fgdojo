import $ from 'jquery';
import React, { Component } from 'react';

import util from '../../util';


export default class PostCreate extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        document.title = 'FG Dojo: Create a new post';
    }

    onSubmit(evt) {
        evt.preventDefault();

        let data = util.getFormData('#post-create-form');
        data.board = this.props.board; // TODO: set board to board ID

        $.post(
            '/api/post',
            $.param(data)
        );
    }

    render() {
        return <div id="post-create">
            <h2>Create a new post</h2>
            <form id="post-create-form" onSubmit={this.onSubmit}>
                <fieldset className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="not_evil_ryu" className="form-control" />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="content">Content</label>
                    <input type="text" name="content" placeholder="a board all about the ryu who is not evil enough" className="form-control" />
                </fieldset>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>;
    }
}
