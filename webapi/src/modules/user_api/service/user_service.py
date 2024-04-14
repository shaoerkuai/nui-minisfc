from redis import asyncio as aioredis


class UserService:
    def __init__(self, r_conn: aioredis.Redis = None, db_conn=None):
        self._r_conn = r_conn
        self._db_conn = db_conn

    async def get_login_user(self, user_name):
        """
        获取已有验证码的待登录用户
        :param self:
        :param user_name:
        :return:
        """
        if self._r_conn is None:
            return None
        if self._r_conn.exists(f'verify:{user_name}') != 1:
            return None
        else:
            data = await self._r_conn.get(f'verify:{user_name}')
            return {'user_id': user_name}


if __name__ == '__main__':
    r = aioredis.Redis(host='localhost', port=3278, db=0)
    u = UserService(r_conn=r)
    print(u.get_login_user('test'))
