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
    render() {
        return <div>
            greetings!
            <Link to={'/'} className="btn btn-primary">
                Back to root
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
