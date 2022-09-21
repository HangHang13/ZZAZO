from .base import *

DEBUG = False


DATABASE_ROUTERS = ['ZZAZO.placeRouter.placeRouter']
DATABASES = {
    # 디폴트에 서버에 올릴 MySQL 적어야 함 
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
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