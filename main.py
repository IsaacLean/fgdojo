#!/usr/bin/env python

import webapp2
from controller import index

app = webapp2.WSGIApplication([
    ('/', index.MainHandler)
], debug=True)
