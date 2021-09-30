from django.urls import path

from . import views


app_name = "ticket"

urlpatterns = [
    path('', views.ListingInterventionView.as_view(), name="home"),
]
