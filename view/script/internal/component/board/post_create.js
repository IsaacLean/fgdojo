import $ from 'jquery';
import React, { Component } from 'react';


export default class PostCreate extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        document.title = 'FG Dojo: Create a new post';
    }

    onSubmit(evt) {
        evt.preventDefault();

        $.post(
            '/api/board/post',
            $('#post-create-form').serialize()
        );
    }

    render() {
        return <div id="boards-create">
            <h2>Create a new post</h2>
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
