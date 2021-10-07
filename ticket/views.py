import json
from datetime import datetime

from pytz import timezone

from django.http import JsonResponse
from django.views.generic.base import View, TemplateView

from .models import Intervention
from .serializer import get_all_interventions_serializer, serialize_inter


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

            return JsonResponse({
                'status': 'ok',
                'saved': serialize_inter(new_inter)
            })
        except Exception as e:
            return JsonResponse(
                {'status': 'error', 'error': str(e)}, status=400)


class RemoveInterventionView(View):
    """
    Remove one intervention.
    """

    def post(self, request):
        try:
            data = json.loads(request.body)
            inter = Intervention.objects.get(
                pk=int(data['pk'])
            )
            inter.delete()
            return JsonResponse({'status': 'ok'})
        except Exception as e:
            return JsonResponse(
                {'status': 'error', 'error': str(e)}, status=400)


class UpdateInterventionView(View):
    """
    Update one intervention data.
    """

    def post(self, request):
        try:
            data = json.loads(request.body)
            tz = timezone(data['tz'])
            splited_date_inter = data['dateString'].split('/')
            inter = Intervention.objects.get(
                pk=int(data['pk'])
            )
            inter.label = data['label']
            inter.description = data['description']
            inter.agent_name = data['agent_name']
            inter.city = data['city']
            inter.status = data['status']
            inter.date = datetime(
                year=int(splited_date_inter[0]),
                month=int(splited_date_inter[1]),
                day=int(splited_date_inter[2]),
                tzinfo=tz
            ).date()
            inter.save()

            return JsonResponse({'status': 'ok'})

        except Exception as e:
            return JsonResponse(
                {'status': 'error', 'error': str(e)}, status=400)