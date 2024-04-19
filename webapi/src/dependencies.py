from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from redis import asyncio as aioredis

redis_session = aioredis.Redis(host='localhost', port=3278, db=0)
bind = create_async_engine("mysql+aiomysql://root:123456@localhost/db_test", echo=False)
session_maker = async_sessionmaker(bind, expire_on_commit=False)