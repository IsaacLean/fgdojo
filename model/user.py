import auth
from google.appengine.ext import ndb


class User(ndb.Model):
    email = ndb.StringProperty(required=True)
    pwHash = ndb.StringProperty(required=True)
    tag = ndb.StringProperty(required=True)
    realName = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    modified = ndb.DateTimeProperty(auto_now=True)

    @classmethod
    def createPwHash(cls, pw):
        return auth.hashPw(pw)

    @classmethod
    def verifyPw(cls, pw, pwHash):
        return auth.verifyPwHashes(pw, pwHash)
