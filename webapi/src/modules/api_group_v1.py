from sanic import Blueprint

# api/v1的接口列表
api_group_all = Blueprint.group(version='/api/v1')
