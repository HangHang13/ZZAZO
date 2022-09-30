"""
WSGI config for ZZAZO project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os, sys

from django.core.wsgi import get_wsgi_application
# sys.path.append('/home/django_projects/MyProject')
# sys.path.append('/home/django_projects/MyProject/ZZAZO')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ZZAZO.settings.prod')

application = get_wsgi_application()

