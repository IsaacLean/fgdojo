import json
import webapp2
from env import JINJA_ENV
from model.board import Board

import logging


# /board
class BoardEndpoint(webapp2.RequestHandler):

    # Create new board
    def post(self):
        name = self.request.get('name')
        desc = self.request.get('desc')
        creator = self.request.get('creator')

        if name == '' or creator == '':
            self.error(400)
        else:
            existingBoard = Board.query(Board.name == name).fetch()

            if len(existingBoard) is 0:
                admins = [creator]
                newBoard = Board(name=name, desc=desc, admins=admins)
                newBoard.put()

                # TODO: redirect to board URL
            else:
                self.error(409)
