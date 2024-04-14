import logging
import sys

def clear_handlers(logger):
    for handler in logger.handlers:
        logger.removeHandler(handler)


def setup_logging():
    sqlalchemy_formater = logging.Formatter('[%(asctime)s] [%(process)s] (%(name)s) [%(levelname)s] %(message)s',
                                            datefmt='%Y-%m-%d %H:%M:%S %z')
    sanic_generic_formatter = logging.Formatter('%(asctime)s [%(process)s] (%(name)s) [%(levelname)s] %(message)s',
                                                datefmt='[%Y-%m-%d %H:%M:%S %z]')
    sanic_access_log_formatter = logging.Formatter(
        '%(asctime)s - (%(name)s)[%(levelname)s][%(host)s]: %(request)s %(message)s %(status)s %(byte)s',
        datefmt='[%Y-%m-%d %H:%M:%S %z]')
    # # refer to https://docs.sqlalchemy.org/en/20/core/engines.html#configuring-logging
    sqlalchemy_engine_logger = logging.getLogger("sqlalchemy.engine.Engine")
    sanic_root = logging.getLogger('sanic.root')
    sanic_error = logging.getLogger('sanic.error')
    sanic_server = logging.getLogger('sanic.server')
    sanic_access = logging.getLogger('sanic.access')

    clear_handlers(sqlalchemy_engine_logger)
    clear_handlers(sanic_error)
    clear_handlers(sanic_root)
    clear_handlers(sanic_server)

    sqlalchemy_handler = logging.StreamHandler(sys.stdout)
    sqlalchemy_handler.setFormatter(sqlalchemy_formater)

    access_console_handler = logging.StreamHandler(sys.stderr)
    access_console_handler.setFormatter(sanic_access_log_formatter)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(sanic_generic_formatter)
    error_console_handler = logging.StreamHandler(sys.stderr)
    error_console_handler.setFormatter(sanic_generic_formatter)

    sanic_error.addHandler(error_console_handler)
    sanic_root.addHandler(console_handler)
    sanic_server.addHandler(console_handler)
    sanic_access.addHandler(access_console_handler)

    sqlalchemy_engine_logger.addHandler(sqlalchemy_handler)
    sqlalchemy_engine_logger.setLevel(logging.INFO)
