#!/usr/bin/env python

import env
import logging
import webapp2
from google.appengine.ext import ndb

class User(ndb.Model):
  tag = ndb.StringProperty(required = True)
  realName = ndb.StringProperty(required = True)
  pwHash = ndb.StringProperty(required = True)
  created = ndb.DateTimeProperty(auto_now_add = True)
  modified = ndb.DateTimeProperty(auto_now = True)

  def getKey(self):
    if(self.key):
      return self.key.id()
    return None

  @classmethod
  def getByKey(cls, id):
    return cls.get_by_id(id)
