#!/usr/bin/env python

import webapp2
from controller.index import MainHandler
from controller.user import UserEndpoint
from controller.user import UserDebugHandler
from controller.login import LoginEndpoint
from controller.login import LoginDebugHandler

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/user', UserEndpoint),
    ('/user/([0-9]+)', UserEndpoint),
    ('/user/debug', UserDebugHandler),
    ('/login', LoginEndpoint),
    ('/login/debug', LoginDebugHandler)
], debug=True)
