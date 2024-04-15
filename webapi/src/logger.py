import logging
import sys
from logging import LogRecord
from typing import Dict, Any

from loguru import logger

contextLogger = logger

LOG_FORMAT = '{time:YYYY-MM-DD HH:mm:ss} [{level}] - {message}'

S_LOGGING_CONFIG_DEFAULTS: Dict[str, Any] = dict(  # no cov
    version=1,
    disable_existing_loggers=False,
    loggers={
        "sanic.root": {"level": "INFO", "handlers": ["console"], "propagate": False},
        "sanic.error": {
            "level": "INFO",
            "handlers": ["error_console"],
            "propagate": False,
            "qualname": "sanic.error",
        },
        "sanic.access": {
            "level": "INFO",
            "handlers": ["access_console"],
            "propagate": False,
            "qualname": "sanic.access",
        },
        "sanic.server": {
            "level": "INFO",
            "handlers": ["console"],
            "propagate": False,
            "qualname": "sanic.server",
        },
    },
    handlers={
        "console": {
            "class": "logger.InterceptHandler",
        },
        "error_console": {
            "class": "logger.InterceptHandler",
        },
        "access_console": {
            "class": "logger.InterceptHandler",
        },
    }
)


class InterceptHandler(logging.StreamHandler):
    def emit(self, record: LogRecord) -> None:
        try:
            level = contextLogger.level(record.levelname).name
        except:
            level = record.levelname
        logger_opt = contextLogger.opt(depth=1, exception=record.exc_info)
        msg = self.format(record)
        logger_opt.log(level, msg)

def setup_log():
    logging.basicConfig(handlers=[InterceptHandler()], level=0)
    #  控制台只打印INFO以上级别
    contextLogger.configure(handlers=[{'sink': sys.stderr, "level": "INFO", "format": LOG_FORMAT}])
    #  trace\debug\error打印到单独的文件
    contextLogger.add("info.log", filter=lambda record: "INFO" in record['level'].name, rotation="10 MB",
                      retention="3 days", level="INFO", format=LOG_FORMAT)
    contextLogger.add("trace.log", filter=lambda record: "TRACE" in record['level'].name, level="TRACE")
    contextLogger.add("debug.log", filter=lambda record: "DEBUG" in record['level'].name, rotation="10 MB",
                      retention="3 days", level="DEBUG", format=LOG_FORMAT)
    contextLogger.add("error.log", filter=lambda record: "ERROR" in record['level'].name, rotation="10 MB",
                      retention="1 days", level="ERROR", format=LOG_FORMAT)
