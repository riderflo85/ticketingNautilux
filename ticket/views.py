import json

from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic.base import TemplateView ,View
from django.views.generic import ListView

from .models import Intervention


class ListingInterventionView(ListView):

    model = Intervention
    queryset = Intervention.objects.all().order_by('create_at')
    template_name = "ticket/ticket.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        return context