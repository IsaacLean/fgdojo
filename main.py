#!/usr/bin/env python

import webapp2
from controller import index
from controller import user

app = webapp2.WSGIApplication([
    ('/', index.MainHandler),
    ('/user', user.UserHandler)
], debug=True)
