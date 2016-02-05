#!/usr/bin/env python

import webapp2
from auth import verifySecureCookie
from env import JINJA_ENV


class MainHandler(webapp2.RequestHandler):
    def get(self):
        if verifySecureCookie(self.request, 'secv'):
            # User is logged in
            template = JINJA_ENV.get_template('feed.html')
            self.response.write(template.render())
        else:
            # User is guest
            template = JINJA_ENV.get_template('front.html')
            self.response.write(template.render())
