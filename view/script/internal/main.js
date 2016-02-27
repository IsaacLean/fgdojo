import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import reducers from './reducer/reducers';
import routes from './routes';


let store = createStore(reducers, applyMiddleware(thunk));
console.log(store.getState());


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

// TODO: stop importing jQuery twice... lol
// TODO: import Bootstrap JS & Tether through webpack
