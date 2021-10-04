from datetime import timedelta
from .models import Intervention


def get_all_interventions_serializer():
    """
    Get all interventions data and serialize to JSON format.
    """
    all_inter = Intervention.objects.all().order_by('create_at')
    data = []
    for inter in all_inter:
        splited_date = inter.date.isoformat().split('-')
        f_date = f"{splited_date[2]}/{splited_date[1]}/{splited_date[0]}"

        s_datetime = inter.create_at + timedelta(hours=2)
        s_datetime = s_datetime.isoformat(timespec='minutes').split('T')
        c_date = s_datetime[0].split('-')
        c_time = s_datetime[1].split('+')[0]
        c_f_date = f"{c_date[2]}/{c_date[1]}/{c_date[0]}"
        d = {
            "pk": inter.pk,
            "label": inter.label,
            "description": inter.description,
            "agent_name": inter.agent_name,
            "city": inter.city,
            "create_at": f"{c_f_date} à {c_time}",
            "date": f_date,
            "status": inter.status,
            "edit": inter.edit
        }
        data.append(d)
    return data