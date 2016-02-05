#!/usr/bin/env python

import webapp2
from controller.main import MainHandler
from controller.user import UserEndpoint
from controller.user import UserDebugHandler
from controller.login import LoginEndpoint
from controller.login import LoginDebugHandler
from controller.login import SessionDebugHandler
from controller.logout import LogoutHandler

app = webapp2.WSGIApplication([
    ('/api/user', UserEndpoint),
    ('/api/user/([0-9]+)', UserEndpoint),
    ('/api/user/debug', UserDebugHandler),
    ('/api/login', LoginEndpoint),
    ('/api/login/debug', LoginDebugHandler),
    ('/api/login/debug2', SessionDebugHandler),
    ('/api/logout', LogoutHandler),
    ('/.*', MainHandler)
], debug=True)
