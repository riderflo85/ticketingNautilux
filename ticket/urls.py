from django.urls import path

from . import views


app_name = "ticket"

urlpatterns = [
    path('', views.ListingInterventionView.as_view(), name="home"),
    path('add-inter', views.AddInterventionView.as_view(), name="add_inter"),
]
