#!/usr/bin/env python

import webapp2
from controller.guest import GuestHandler
from controller.api.user import UserEndpoint
from controller.api.user import UserDebugHandler
from controller.api.login import LoginEndpoint
from controller.api.login import LoginDebugHandler
from controller.api.login import SessionDebugHandler
from controller.api.logout import LogoutHandler
from controller.api.board import BoardEndpoint
from controller.api.post import PostEndpoint

app = webapp2.WSGIApplication([
    ('/api/user', UserEndpoint),
    ('/api/user/([0-9]+)', UserEndpoint),
    ('/api/user/debug', UserDebugHandler),
    ('/api/login', LoginEndpoint),
    ('/api/login/debug', LoginDebugHandler),
    ('/api/login/debug2', SessionDebugHandler),
    ('/api/logout', LogoutHandler),
    ('/api/board', BoardEndpoint),
    ('/api/board/(\w+)', BoardEndpoint),
    ('/api/post', PostEndpoint),
    ('/.*', GuestHandler)
], debug=True)
