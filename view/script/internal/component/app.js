import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return <div id="app">
            <h1>FG Dojo</h1>
            {this.props.children}
        </div>;
    }
}