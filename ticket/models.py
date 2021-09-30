from django.db import models


class Intervention(models.Model):

    STATUS_STATE = [
        ('Brouillon', 'Brouillon'),
        ('Validé', 'Validé'),
        ('Terminé', 'Terminé')
    ]

    label = models.CharField(
        max_length=250,
        verbose_name="libellé de l'intervention"
    )
    description = models.TextField(
        verbose_name="description de l'intervention"
    )
    agent_name = models.CharField(
        max_length=120,
        verbose_name="nom de l'intervenant"
    )
    city = models.CharField(
        max_length=350,
        verbose_name="lieu de l'intervention"
    )
    create_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="intervention créée le"
    )
    date = models.DateField(
        verbose_name="date de l'intervention"
    )
    status = models.CharField(
        max_length=25,
        choices=STATUS_STATE,
        default=STATUS_STATE[0][0],
        verbose_name="statu de l'intervention"
    )
    edit = models.BooleanField(
        default=True,
        verbose_name="modification de l'intervention"
    )
