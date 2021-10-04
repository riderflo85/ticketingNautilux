import json
from datetime import datetime

from pytz import timezone

from django.http import JsonResponse
from django.views.generic.base import View, TemplateView

from .models import Intervention
from .serializer import get_all_interventions_serializer


class ListingInterventionsView(TemplateView):
    template_name = "ticket/ticket.html"


class GetAllInterventionsView(View):

    def get(self, request):
        all_inter = get_all_interventions_serializer()
        return JsonResponse({'inters': all_inter})


class AddInterventionView(View):
    """
    Added one intervention in the database.
    """

    def post(self, request):
        try:
            data = json.loads(request.body)
            tz = timezone(data['tz'])
            splited_date_inter = data['dateInter'].split('-')
            new_inter = Intervention()
            new_inter.label = data['label']
            new_inter.description = data['desc']
            new_inter.agent_name = data['userInter']
            new_inter.city = data['place']
            new_inter.status = data['status']
            new_inter.date = datetime(
                year=int(splited_date_inter[0]),
                month=int(splited_date_inter[1]),
                day=int(splited_date_inter[2]),
                tzinfo=tz
            ).date()
            new_inter.create_at = datetime.now(tz=tz)
            new_inter.save()

            return JsonResponse({'status': 'ok'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'error': str(e)})

