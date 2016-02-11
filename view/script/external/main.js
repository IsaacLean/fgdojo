require('./util.js');

document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');

    if(location.pathname === '/') {
        loginForm.addEventListener('submit', function(evt) {
            evt.preventDefault();

            var loginReq = new XMLHttpRequest();

            loginReq.onload = function() {
                if(loginReq.status === 200) {
                    window.location = '/';
                } else {
                    alert('Username or password incorrect');
                }
            };

            var data = {
                email: evt.target.querySelector('input[name="email"]').value,
                pw: evt.target.querySelector('input[name="pw"]').value
            };

            data = parameterize(data);
            console.log(data);

            loginReq.open('POST', '/api/login');
            loginReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            loginReq.send(data);
        });
    } else if(location.pathname === '/signup') {
        console.log('signup!');
    }
});
