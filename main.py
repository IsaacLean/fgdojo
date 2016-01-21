#!/usr/bin/env python

import webapp2
from controller.index import MainHandler
from controller.user import UserEndpoint
from controller.user import UserDebugHandler
from controller.login import LoginEndpoint
from controller.login import LoginDebugHandler
from controller.login import SessionDebugHandler

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/user', UserEndpoint),
    ('/user/([0-9]+)', UserEndpoint),
    ('/user/debug', UserDebugHandler),
    ('/login', LoginEndpoint),
    ('/login/debug', LoginDebugHandler),
    ('/login/debug2', SessionDebugHandler)
], debug=True)
