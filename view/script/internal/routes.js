import React from 'react';
import { Redirect, Route } from 'react-router';

import App from './component/app';
import Boards from './component/board/boards';
import Feed from './component/feed';


const NotFound = () => <div>Not Found</div>;


export default <Route component={App}>
    // feed
    <Redirect from='/' to='feed' />
    <Route path='feed' component={Feed} />

    // boards
    <Route path='b(/:board_name(/:post_id/:post_name))' component={Boards} />
    <Redirect from='boards' to='b' />
    <Redirect from='board' to='b' />

    // everything else
    <Route path='*' component={NotFound} />
</Route>;
