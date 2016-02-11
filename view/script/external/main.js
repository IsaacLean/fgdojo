var Util = require('./util.js');

document.addEventListener('DOMContentLoaded', function() {
    if(location.pathname === '/') {
        var loginForm = document.getElementById('login-form');

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

            data = Util.parameterize(data);

            loginReq.open('POST', '/api/login');
            loginReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            loginReq.send(data);
        });
    } else if(location.pathname === '/signup') {
        var signupForm = document.getElementById('signup-form');

        signupForm.addEventListener('submit', function(evt) {
            evt.preventDefault();

            var signupReq = new XMLHttpRequest();

            signupReq.onload = function() {
                if(signupReq.status === 200) {
                    window.location = '/';
                } else if(signupReq.status === 400) {
                    alert('Email, password, or tag was left empty. It is required!');
                } else if(signupReq.status === 409) {
                    alert('A user already exists with your email or tag');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            };

            var data = {
                email: evt.target.querySelector('input[name="email"]').value,
                pw: evt.target.querySelector('input[name="pw"]').value,
                tag: evt.target.querySelector('input[name="tag"]').value,
                realName: evt.target.querySelector('input[name="realName"]').value
            };

            data = Util.parameterize(data);

            signupReq.open('POST', '/api/user');
            signupReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            signupReq.send(data);
        });
    }
});
