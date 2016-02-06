import React, { Component } from 'react';

export default class App extends Component {
    render() {
        var currDate = new Date();
        console.log('app rendered ' + currDate.getSeconds());
        return <div>{this.props.children}</div>;
    }

    componentWillUnmount() {
        console.log('app died');
    }
}
