import json
import webapp2

from auth import getSecureUser
from env import JINJA_ENV
from model.post import Post


# /post
class PostEndpoint(webapp2.RequestHandler):
    # Read post
    # def get(self, name=None):
    #     if name is not None:
    #         # /board/{name}: Read data for specific board
    #         board = Board.query(Board.name == name).get()

    #         if board is not None:
    #             response = {
    #                 'name': board.name,
    #                 'desc': board.desc,
    #                 'admins': board.admins
    #             }

    #             self.response.write(json.dumps(response))
    #         else:
    #             self.error(404)
    #     else:
    #         # /board: Read list of default boards
    #         boardsQuery = Board.query().fetch(10)
    #         boards = []

    #         for board in boardsQuery:
    #             boardData = {
    #                 'name': board.name,
    #                 'desc': board.desc,
    #                 'admins': board.admins
    #             }
    #             boards.append(boardData)

    #         response = {
    #             'boards': boards
    #         }

    #         self.response.write(json.dumps(response))

    # Create new post
    def post(self):
        title = self.request.get('title')
        content = self.request.get('content')
        board = int(self.request.get('board'))

        if title == '':
            self.error(400)
        else:
            author = getSecureUser(self.request)

            if(author is not None):
                # TODO: check if user is authorized to post in board

                newPost = Post(title=title, content=content, author=author, board=board)
                newPost.put()

                # TODO: redirect to post URL
            else:
                self.error(401)
