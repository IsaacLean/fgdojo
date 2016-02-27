import $ from 'jquery';


export function clickTag(user) {
    return () => {
        console.log('tag was clicked');
    };
}

export const FETCH_USER = 'FETCH_USER';

export function fetchUser() {
    return () => {
        $.get('/api/board/notkappa', function(data) {
            console.log('lol hai');
        }.bind(this))
        .fail(function() {
            console.log('test');
        }.bind(this));
    };
}
