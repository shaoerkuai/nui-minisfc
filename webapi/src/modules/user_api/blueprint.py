import re
import secrets

from sanic import Blueprint, json

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
    username: str = request.args.get('username')
    if username is None:
        return json({"status": "fail", "message": "username is missing"})
    if re.fullmatch(re_en_num_only, username) is None:
        return json({"status": "fail", "message": "username is invalid"})
    code = await generate_random_number()
    return json({"status": "ok"})
