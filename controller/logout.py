#!/usr/bin/env python

import webapp2
from auth import deleteSecureCookie


class LogoutHandler(webapp2.RequestHandler):
    def get(self):
        deleteSecureCookie(self.response, 'secv')
        self.redirect('/')
