import json
import webapp2

from auth import getSecureUser
from env import JINJA_ENV
from model.post import Post


# /post
class PostEndpoint(webapp2.RequestHandler):
    # Read post
    def get(self, id=None):
        if id is not None:
            # /post/{id}: Read data for specific post
            post = Post.get_by_id(int(id))

            if post is not None:
                response = {
                    'id': post.key.id(),
                    'title': post.title,
                    'content': post.content,
                    'author': post.author,
                    'board': post.board,
                    'created': str(post.created),
                    'modified': str(post.modified)
                }

                self.response.write(json.dumps(response))
            else:
                self.error(404)
        else:
            # /post: Read list of default posts
            postsQuery = Post.query().fetch(10)
            posts = []

            for post in postsQuery:
                postData = {
                    'id': post.key.id(),
                    'title': post.title,
                    'content': post.content,
                    'author': post.author,
                    'board': post.board,
                    'created': str(post.created),
                    'modified': str(post.modified)
                }
                posts.append(postData)

            response = {
                'posts': posts
            }

            self.response.write(json.dumps(response))

    # Create new post
    def post(self):
        title = self.request.get('title')
        content = self.request.get('content')
        board = self.request.get('board')

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
