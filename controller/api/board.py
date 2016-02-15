import json
import webapp2
from env import JINJA_ENV
from model.board import Board

import logging

# /board
class BoardEndpoint(webapp2.RequestHandler):
    # Read board
    def get(self, id=None):
        if id is not None:
            # /b/{ID}
            board = Board.get_by_id(int(id))

            if board is not None:
                response = {
                    'name': board.name,
                    'desc': board.desc,
                    'admins': board.admins
                }

                self.response.write(json.dumps(response))
            else:
                self.error(404)
        else:
            # /b: Read list of default boards
            boardsQuery = Board.query().fetch(10)
            boards = []

            for board in boardsQuery:
                boardData = {
                    'name': board.name,
                    'desc': board.desc,
                    'admins': board.admins
                }
                boards.append(boardData)

            response = {
                'boards': boards
            }

            self.response.write(json.dumps(response))

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
