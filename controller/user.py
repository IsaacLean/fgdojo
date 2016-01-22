#!/usr/bin/env python

import json
import webapp2
from env import JINJA_ENV
from model.user import User


# /user
class UserEndpoint(webapp2.RequestHandler):
    # Read user data with ID
    def get(self, id=None):
        if id is not None:
            user = User.get_by_id(int(id))

            if user is not None:
                response = {
                    'tag': user.email,
                    'realName': user.realName
                }

                self.response.write(json.dumps(response))
            else:
                self.error(404)
        else:
            # GET not supported for /user
            # TODO: query groups of users with GET req to /user
            self.error(404)

    # Create new user
    def post(self):
        email = self.request.get('email')
        pw = self.request.get('pw')
        tag = self.request.get('tag')
        realName = self.request.get('realName')

        # TODO: check if tag or email already exists
        pwHash = User.createPwHash(pw)

        newUser = User(email=email, pwHash=pwHash, tag=tag, realName=realName)
        newUser.put()


# Render view for endpoint testing
class UserDebugHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENV.get_template('userdebug.html')
        self.response.write(template.render())
