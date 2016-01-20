#!/usr/bin/env python

import auth
from google.appengine.ext import ndb

class User(ndb.Model):
  email = ndb.StringProperty(required=True)
  pwHash = ndb.StringProperty(required=True)
  tag = ndb.StringProperty(required=True)
  realName = ndb.StringProperty()

  @classmethod
  def createPwHash(cls, pw):
    return auth.hashPw(pw)

  @classmethod
  def verifyPw(cls, pw, pwHash):
    return auth.verifyPwHashes(pw, pwHash)
