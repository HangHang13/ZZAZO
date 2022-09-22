from .base import *
import os, json
from django.core.exceptions import ImproperlyConfigured

secret_file = os.path.join('./', 'secrets.json')

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)

SECRET_KEY = get_secret("SECRET_KEY")
MOGNOPASS = get_secret("")
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