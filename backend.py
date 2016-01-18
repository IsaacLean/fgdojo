#!/usr/bin/env python

import endpoints
import logging
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from model.user import User
from env import WEB_CLIENT_ID

package = 'BE'

class UserRsp(messages.Message):
  id = messages.IntegerField(1)
  tag = messages.StringField(2)
  realName = messages.StringField(3)
  pwHash = messages.StringField(4)

@endpoints.api(
  name='user',
  version='v1',
  allowed_client_ids=[WEB_CLIENT_ID, endpoints.API_EXPLORER_CLIENT_ID],
  scopes=[endpoints.EMAIL_SCOPE]
)
class UserApi(remote.Service):
  APPEND_METHOD_REQ = endpoints.ResourceContainer(UserRsp)

  @endpoints.method(
    APPEND_METHOD_REQ,
    UserRsp,
    path='user',
    http_method='POST',
    name='append'
  )
  def appendUser(self, request):
    logging.info('appendUser called')
    #self.response.headers.add_header('Set-Cookie', '%s=%s; Path=/' % ('test', '1234'))
    return UserRsp(id=request.id, tag=request.tag, realName=request.realName, pwHash=request.pwHash)

  ID_RESOURCE = endpoints.ResourceContainer(
    message_types.VoidMessage,
    id=messages.IntegerField(1, variant=messages.Variant.INT32)
  )

  @endpoints.method(ID_RESOURCE, UserRsp, path='user/{id}', http_method='GET', name='getUser')
  def getUser(self, request):
    logging.info('getUser called')
    user = User.getByKey(request.id)
    if user == None:
      raise endpoints.NotFoundException('User %s not found.' % (request.id))
    else:
      userRsp = UserRsp(id=request.id, tag=user.tag, realName=user.realName, pwHash=user.pwHash)
      return userRsp

  @endpoints.method(
    message_types.VoidMessage,
    UserRsp,
    path='authed',
    http_method='POST',
    name='authed'
  )
  def authUser(self, request):
    current_user = endpoints.get_current_user()
    logging.info('authed called')
    logging.info(current_user)
    email = (current_user.email() if current_user is not None else 'Anonymous')
    return UserRsp(id=111, tag=email, realName='eyyy', pwHash='eyyy')

app = endpoints.api_server([UserApi])
