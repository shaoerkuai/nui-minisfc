from sanic import Blueprint

from src.modules.user_api.blueprint import user_api_bp

# api/v1的接口列表
api_group_all = Blueprint.group(user_api_bp, url_prefix='/api/v1')
