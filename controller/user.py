#!/usr/bin/env python

import env
import logging
import webapp2
from model.user import User

class UserHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(env.SECRET)
        newUser = User(tag='tag', realName='realName', pwHash='pwHash')
        #logging.info(newUser.getKey())
        logging.info(User.getByKey(5066549580791808))
