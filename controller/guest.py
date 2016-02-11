#!/usr/bin/env python

import webapp2
from auth import verifySecureCookie
from env import JINJA_ENV


class GuestHandler(webapp2.RequestHandler):
    def get(self):
        if verifySecureCookie(self.request, 'secv'):
            # User is logged in
            template = JINJA_ENV.get_template('feed.html')
            self.response.write(template.render())
        else:
            # User is guest
            if(self.request.path == '/'):
                template = JINJA_ENV.get_template('front.html')
                self.response.write(template.render())
            elif(self.request.path == '/signup'):
                template = JINJA_ENV.get_template('signup.html')
                self.response.write(template.render())
            else:
                self.error(404)
                self.response.write('render 404 template here')
