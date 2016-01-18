#!/usr/bin/env python

import endpoints
import logging
from protorpc import messages
from protorpc import message_types
from protorpc import remote
from model.user import User

package = 'BE'

class UserRsp(messages.Message):
  id = messages.IntegerField(1)
  tag = messages.StringField(2)
  realName = messages.StringField(3)
  pwHash = messages.StringField(4)

@endpoints.api(name='user', version='v1')
class UserApi(remote.Service):
  ID_RESOURCE = endpoints.ResourceContainer(
    message_types.VoidMessage,
    id=messages.IntegerField(1, variant=messages.Variant.INT32)
  )

  @endpoints.method(ID_RESOURCE, UserRsp, path='user/{id}', http_method='GET', name='users.getUser')
  def userGet(self, request):
    user = User.getByKey(request.id)
    if user == None:
      raise endpoints.NotFoundException('User %s not found.' % (request.id))
    else:
      userRsp = UserRsp(id=request.id, tag=user.tag, realName=user.realName, pwHash=user.pwHash)
      return userRsp

app = endpoints.api_server([UserApi])
