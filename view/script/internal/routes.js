import React, { Component, PropTypes } from 'react';
import { IndexRoute, Link, Redirect, Route, Router } from 'react-router';

import App from './component/app';
import Boards from './component/board/boards';

class Welcome extends Component {
    render() {
        return <div>
            welcome!
            <Link to={'/b'} className="btn btn-primary">
                Go to boards
            </Link>
            <a href="/api/logout" className="btn btn-danger">Logout</a>
        </div>;
    }
}

class Greeting extends Component {
    constructor(props) {
        super(props);

        this.state = { counter: 0 };

        this.onClickLink = this.onClickLink.bind(this);
    }

    onClickLink() {
        this.setState({ counter: ++this.state.counter });
    }

    render() {
        return <div>
            greetings!
            {this.state.counter}
            <Link to={'/'} className="btn btn-primary">
                Back to root
            </Link>
            <Link to={'greet'} onClick={this.onClickLink} className="btn btn-primary">
                Go to greet
            </Link>
            <Link to={'greet2'} className="btn btn-primary">
                Go to greet2
            </Link>
        </div>;
    }

    componentWillUnmount() {
        console.log('greeting is dying');
    }
}


const NotFound = () => <div>Not Found</div>;

const Test = () => {
    console.log('tesssst');
};


export default <Route path='/' component={App}>
    <IndexRoute component={Welcome} />

    // boards
    <Route path="b" component={Boards}>
        <Route path="create" component={Boards} />
    </Route>
    <Redirect from="boards" to="b" />
    <Redirect from="board" to="b" />

    <Route path="greet" component={Greeting} />
    <Route path="*" component={NotFound} />
</Route>;
