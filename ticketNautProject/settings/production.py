import os

from .default import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['nom_de_domaine.extension']

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# A CHANGER PAR DU POSTGRESQL POUR UNE GESTION D'UNE BASE DE DONNÉES CONSÉQUENTE
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}