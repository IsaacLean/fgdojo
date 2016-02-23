import json
import webapp2

from auth import getSecureUser
from model.board import Board
from model.post import Post


# /board
class BoardEndpoint(webapp2.RequestHandler):
    # Read board
    def get(self, name=None):
        if name is not None:
            # /board/{name}: Read data for specific board
            board = Board.query(Board.name == name).get()

            if board is not None:
                queryString = self.request.GET.getall('post')

                queryType = None

                if(len(queryString) > 0):
                    # query string received
                    queryType = queryString[0]

                    if(queryType == 'new'):
                        # show new posts in board
                        postsQuery = Post.query(Post.board == name).fetch(25)
                        posts = []

                        for post in postsQuery:
                            posts.append({
                                'id': post.key.id(),
                                'title': post.title,
                                'content': post.content,
                                'author': post.author,
                                'board': post.board,
                                'created': str(post.created),
                                'modified': str(post.modified)
                            })

                        response = {
                            'posts': posts
                        }

                        self.response.write(json.dumps(response))
                    else:
                        # invalid query string received
                        self.error(404)
                else:
                    # no query string received
                    response = {
                        'name': board.name,
                        'desc': board.desc,
                        'admins': board.admins,
                    }

                    self.response.write(json.dumps(response))
            else:
                # board doesn't exist
                self.error(404)
        else:
            # /board: Read list of default boards
            boardsQuery = Board.query().fetch(25)
            boards = []

            for board in boardsQuery:
                boards.append({
                    'name': board.name,
                    'desc': board.desc,
                    'admins': board.admins
                })

            response = {
                'boards': boards
            }

            self.response.write(json.dumps(response))

    # Create new board
    def post(self):
        name = self.request.get('name')
        desc = self.request.get('desc')

        if name == '':
            self.error(400)
        else:
            creator = getSecureUser(self.request)

            if(creator is not None):
                existingBoard = Board.query(Board.name == name).fetch()

                if len(existingBoard) is 0:
                    admins = [creator]
                    newBoard = Board(name=name, desc=desc, admins=admins)
                    newBoard.put()

                    # TODO: redirect to board URL
                else:
                    self.error(409)
            else:
                self.error(401)
