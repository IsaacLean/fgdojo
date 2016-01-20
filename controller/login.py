#!/usr/bin/env python

import webapp2
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
      if validPw == False:
        self.error(401)
    else:
      self.error(404)

# Render view for endpoint testing
class LoginDebugHandler(webapp2.RequestHandler):
  def get(self):
    template = JINJA_ENV.get_template('logindebug.html')
    self.response.write(template.render())
