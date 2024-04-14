import traceback

from sanic import json
from sanic_jwt import Responses, Claim
from sanic_jwt import exceptions
from sanic_jwt.exceptions import SanicJWTException

MANAGERS = ['wangwu', 'admin']  # 管理员列表


class AuthenticationCreateTokenFailed(SanicJWTException):
    status_code = 406

    def __init__(self, message="Authentication failed.", **kwargs):
        super().__init__(message, **kwargs)


class MyCustomClaim(Claim):
    key = 'dept'

    def setup(self, payload, user):
        return 'IT Test'

    def verify(self, value):
        return True


class MyResponses(Responses):
    """
    修改Sanic JWT 的返回响应
    """

    @staticmethod
    def exception_response(request, exception):
        exception_message = str(exception)
        return json({
            'error': True,
            'message': f'{exception_message}'
        }, status=exception.status_code)

    @staticmethod
    def extend_retrieve_user(request, user=None, payload=None):
        # TO GET USER DETAIL
        return {}


async def my_scope_extender(user, *args, **kwargs):
    """
    自定义scope生成器
    :param user:
    :param args:
    :param kwargs:
    :return:
    """
    return user['scopes']


async def get_login_user(aio_session, user_name):
    """
    获取user信息生成token
    :param aio_session: async redis
    :param user_name:
    :return:
    """

    async def __set_manager_scope():
        if user_name in MANAGERS:
            return ['user', 'admin']
        else:
            return ['user']

    if aio_session is None:
        return None
    if await aio_session.exists(f'verify:{user_name}') != 1:
        return None
    else:
        data: bytes = await aio_session.get(f'verify:{user_name}')
        dto = {'code': data.decode(), 'user_id': user_name, 'scopes': await __set_manager_scope()}
        return dto


async def authenticate(request, *args, **kwargs):
    """
    授权入口
    :param request: sanic request
    :param args:
    :param kwargs:
    :return:
    """
    username = request.json.get('username', None)
    password = request.json.get('code', None)

    if not username or not password:
        raise AuthenticationCreateTokenFailed("Missing verify code or password.")

    user = await get_login_user(aio_session=request.ctx.r_session, user_name=username)
    if user is None:
        raise AuthenticationCreateTokenFailed("User not found.")

    if password != user['code']:
        raise AuthenticationCreateTokenFailed("Verify code is incorrect.")
    return user
