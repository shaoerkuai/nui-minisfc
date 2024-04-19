import asyncio
from contextvars import ContextVar

import sqlalchemy
from sanic import Sanic, json
from sanic.exceptions import HTTPException
from sanic.log import logger
from sanic_jwt import initialize, scoped
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from src import config, dependencies
from src.auth import authenticate, MyResponses, my_scope_extender, MyRealNameClaim, MyDepartmentClaim
from src.logger import setup_log, S_LOGGING_CONFIG_DEFAULTS
from src.modules.api_group_v1 import api_group_all

_base_model_session_ctx = ContextVar("session")

# TODO ONLY FOR DEMO,RE-GENERATE FOR YOUR SELF !!!
secret = 'a67636b3970539ef97727d3baf9de38618f7b1123bbda7d7f0f1353b3eb75cfbbed4210ee2f9487872132a9b4b821f993616e2cb2339fc9080f0507fcf2c0b5048254220f90c344fa2c15b2e8cf82142ac8e9604f545e7bc0be5460049d8cbac976ad174ba3aff51a1f3f5aec8819855129b2146c2638a56fecfb5d68415f4a4e1f005a0752bd8616805a34e0946aeb0a39d9ab37be0866e2045ebcb532d55e44fd12cae6d2a392785b705d007344c3ff640730808dc5c7a023140caff87cb60cd73d6cd34b8f80b0b89ba7b088b22859f82f77dd240a736c31e689daaa0740cc586dfa3ac9af3f6410088f1090ba40cdee145aa10d51377660c6ca1df5d7da3'

setup_log()
app = Sanic('demo-app', log_config=S_LOGGING_CONFIG_DEFAULTS)
initialize(app, authenticate=authenticate,
           secret=secret,
           expiration_delta=60 * 60 * 24,
           responses_class=MyResponses,
           url_prefix="/api/v1/security",
           scopes_enabled=True,
           add_scopes_to_payload=my_scope_extender,
           claim_aud='demoapp.com',
           claim_iat=True,
           custom_claims=[MyRealNameClaim, MyDepartmentClaim])
app.blueprint(api_group_all)


@app.middleware("request")
async def inject_redis_session(request):
    request.ctx.r_session = dependencies.redis_session
    request.ctx.session = dependencies.session_maker()
    request.ctx.session_ctx_token = _base_model_session_ctx.set(request.ctx.session)


@app.middleware("response")
async def close_session(request, response):
    if hasattr(request.ctx, "session_ctx_token"):
        _base_model_session_ctx.reset(request.ctx.session_ctx_token)  # 结束session标记
        await request.ctx.session.close()


@app.exception(sqlalchemy.exc.IntegrityError)
async def catch_driver_exception(request, exception):
    logger.error(exception)
    return json({
        "error": True,
        "message": "Integrity error, try again."
    }, 500)


@app.exception(HTTPException)
async def catch_driver_exception(request, exception: HTTPException):
    return json({
        "error": True,
        "message": exception.args[0]
    }, exception.status_code)


@app.post('/api/v1/ds')
@scoped(['admin', 'user'])
async def ds(request):
    session: AsyncSession = request.ctx.session
    async with session.begin():
        statement = text("""INSERT INTO db_test.test_tb_1 VALUES (1111111,'2233')""")
        await session.execute(statement)
    logger.info('我是1')
    return json({"dd": "aa"})


async def check_db_connection():
    logger.info('Check database connection')
    async with dependencies.bind.connect() as conn:
        await conn.execute(text('SELECT 1'))
    await dependencies.redis_session.get('1')


if __name__ == '__main__':
    asyncio.run(check_db_connection())
    app.run(host=config.ADDR_BIND, port=config.HTTP_PORT, auto_tls=config.HTTPS_ENABLED)
