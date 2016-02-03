// var component = require('./scriptsubfolder/script2');
// var app = document.createElement('div');

// document.body.appendChild(app);

// app.appendChild(component());

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Test from './scriptsubfolder/script2.js';

class App extends Component {
    render() {
        return <div>
            React works!
            <Test />
        </div>;
    }
}

console.log('yeah!! no eh');

ReactDOM.render(<App />, document.getElementById('container'));