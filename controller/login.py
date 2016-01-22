#!/usr/bin/env python

import webapp2
from auth import createSecureCookie
from auth import verifySecureCookie
from env import JINJA_ENV
from model.user import User

# /login
class LoginEndpoint(webapp2.RequestHandler):
    # Login
    def post(self):
        email = self.request.get('email')
        pw = self.request.get('pw')

        user = User.query(User.email == email).get()

        if user:
            validPw = User.verifyPw(pw, user.pwHash)
            if validPw:
                createSecureCookie(self.response, 'secv', str(user.key.id()) + str(user.created))
            else:
                self.error(401)
        else:
            self.error(404)

# Render view for endpoint testing
class LoginDebugHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENV.get_template('logindebug.html')
        self.response.write(template.render())

class SessionDebugHandler(webapp2.RequestHandler):
    def get(self):
        if verifySecureCookie(self.request, 'secv'):
            self.response.write('You are logged in')
        else:
            self.response.write('You are not logged in')
