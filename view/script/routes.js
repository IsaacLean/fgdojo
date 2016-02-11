import React, { Component } from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import App from './components/app';

class Welcome extends Component {
    render() {
        return <div>
            welcome!
            <Link to={'greet2'} className="btn btn-primary">
                Go to greet2
            </Link>
            <a href="/api/logout" className="btn btn-danger">Logout</a>
        </div>;
    }

    componentWillUnmount() {
        console.log('welcome is dying');
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

export default <Route path='/' component={App}>
    <IndexRoute component={Welcome} />
    <Route path="greet" component={Greeting} />
    <Route path="greet2" component={Greeting} />
    <Route path="*" component={NotFound} />
</Route>;
