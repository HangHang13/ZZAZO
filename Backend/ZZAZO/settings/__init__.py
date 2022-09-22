from .base import *

DEBUG = False


DATABASE_ROUTERS = ['ZZAZO.placeRouter.placeRouter']
DATABASES = {
    # 디폴트에 서버에 올릴 MySQL 적어야 함 
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'S07P23B307',
        'USER': 'S07P23B307',
        'PASSWORD': 'b307ZAZZO~',
        'HOST': 'stg-yswa-kr-practice-db-master.mariadb.database.azure.com',
        'PORT': '3306'
    },

    'place': {
        'ENGINE': 'djongo',
        'ENFORCE_SCHEMA': False,
        'LOGGING': {
            'version': 1,
            'loggers': {
                'djongo': {
                    'level': 'DEBUG',
                    'propogate': False,                        
                }
            },
         },
        'NAME': 'S07P22B307',
        'CLIENT': {
            'host': 'mongodb+srv://S07P22B307:6bqIN7398L@ssafy.ngivl.mongodb.net/S07P22B307?authSource=admin',
            'port': 27017,
            'username': 'S07P22B307',
            'password': "ilRiOqQfhB",
            'authSource': 'admin',
            'authMechanism': 'SCRAM-SHA-1'
        }
    }
}

ALLOWED_HOSTS = []