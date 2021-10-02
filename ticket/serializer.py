from django.core import serializers

from .models import Intervention


def get_all_interventions_serializer():
    """
    Get all interventions data and serialize to JSON format.
    """
    all_inter = Intervention.objects.all().order_by('create_at')
    data = serializers.serialize("json", all_inter)
    return data