from redis import asyncio as aioredis
from sanic import Sanic, json
from sanic_jwt import initialize, scoped

from src.auth import authenticate, MyResponses, my_scope_extender, MyCustomClaim

_redis_session = aioredis.Redis(host='localhost', port=3278, db=0)

secret = 'a67636b3970539ef97727d3baf9de38618f7b1123bbda7d7f0f1353b3eb75cfbbed4210ee2f9487872132a9b4b821f993616e2cb2339fc9080f0507fcf2c0b5048254220f90c344fa2c15b2e8cf82142ac8e9604f545e7bc0be5460049d8cbac976ad174ba3aff51a1f3f5aec8819855129b2146c2638a56fecfb5d68415f4a4e1f005a0752bd8616805a34e0946aeb0a39d9ab37be0866e2045ebcb532d55e44fd12cae6d2a392785b705d007344c3ff640730808dc5c7a023140caff87cb60cd73d6cd34b8f80b0b89ba7b088b22859f82f77dd240a736c31e689daaa0740cc586dfa3ac9af3f6410088f1090ba40cdee145aa10d51377660c6ca1df5d7da3'

app = Sanic('demo-app')

initialize(app, authenticate=authenticate,
           secret=secret,
           expiration_delta=60 * 60 * 24,
           responses_class=MyResponses,
           url_prefix="/api/v1/security",
           scopes_enabled=True,
           add_scopes_to_payload=my_scope_extender,
           claim_aud='demoapp.com',
           claim_iat=True,
           custom_claims=[MyCustomClaim])


@app.middleware("request")
async def inject_redis_session(request):
    request.ctx.r_session = _redis_session


@app.post('/api/v1/ds')
@scoped(['admin', 'user'])
async def ds(request):
    return json({"dd": "aa"})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
