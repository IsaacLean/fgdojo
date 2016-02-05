#!/usr/bin/env python

import webapp2
from env import JINJA_ENV


class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENV.get_template('main.html')
        self.response.write(template.render())
