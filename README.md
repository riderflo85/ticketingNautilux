# Ticket Nautilux
### Interface de suivie d'intervention par tiquet.
Projet réalisé le 30/09/2021 par GRENAILLE Florent.

# Dépendances
- pipenv
- Python 3.8
- Django 3.2.7
- AngularJS 1.7.9

# Installation
Installer [pipenv](https://pypi.org/project/pipenv/) via pip
```shell
$ pip install pipenv
```

Installer le projet et ces dépendances.
```shell
$ pipenv install
```

# Configuration de l'environnement
Ajouter un fichier *.env* à la racine du projet
```shell
$ touch .env
```

Dans le fichier **.env**, ajouter les variables d'environnement:
- SECRET_KEY
- DJANGO_SETTINGS_MODULE

Pour générer une clé secret et définir la variable *SECRET_KEY*, exécutez le script *new_secret_key.py* qui est à la racine du projet.
```shell
$ python3 new_secret_key.py
4nLpD6cJyfP0uP1gfJh7rni86MsJGkd9rDpIlxmKWobkaMzl
```

Si vous êtes en environnement de développement, la variable d'environnement *DJANGO_SETTINGS_MODULE* sera égale à **ticketNautProject.settings.development**.

Si vous êtes en environnement de production, la variable d'environnement *DJANGO_SETTINGS_MODULE* sera égale à **ticketNautProject.settings.production** et vous devez configurer le fichier *ticketNautProject/settings/production.py* afin de renseigner votre configuration (nom de domaine, système de base de données et configuration pour les fichiers static et media).

