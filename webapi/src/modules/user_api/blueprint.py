import re
import secrets

from sanic import Blueprint, json
from sanic_jwt import scoped

from sanic.log import logger

user_api_bp = Blueprint('user_api', url_prefix='/user')

re_en_num_only = re.compile(r'^[a-z0-9]+$')


async def generate_random_number():
    init = secrets.randbelow(1000000)
    while True:
        if init < 100000:
            init = secrets.randbelow(1000000)
        else:
            return init


@user_api_bp.route('/verifyCode', methods=["GET"])
async def verify_code(request):
    logger.info("nh")
    username: str = request.args.get('username')
    if username is None:
        return json({"error": True, "message": "username is missing"})
    if re.fullmatch(re_en_num_only, username) is None:
        return json({"error": True, "message": "username is invalid"})
    if await request.ctx.r_session.exists(f'verify:{username}') != 1:
        code = await generate_random_number()
        await request.ctx.r_session.set(f"verify:{username}", str(code), nx=True, ex=5 * 60)
    return json({"error": False})
