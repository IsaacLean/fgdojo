from google.appengine.ext import ndb


class Board(ndb.Model):
    name = ndb.StringProperty(required=True)
    desc = ndb.StringProperty(required=True)
    admins = ndb.StringProperty(repeated=True)
    created = ndb.DateTimeProperty(auto_now_add=True)
    modified = ndb.DateTimeProperty(auto_now=True)
