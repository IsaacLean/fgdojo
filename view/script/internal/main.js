import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Router, browserHistory } from 'react-router';

import reducers from './reducer/reducers';
import routes from './routes';


const store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

// TODO: stop importing jQuery twice... lol
// TODO: import Bootstrap JS & Tether through webpack
