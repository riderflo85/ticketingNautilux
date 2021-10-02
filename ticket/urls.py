from django.urls import path

from . import views


app_name = "ticket"

urlpatterns = [
    path('', views.ListingInterventionsView.as_view(), name="home"),
    path('inters', views.GetAllInterventionsView.as_view(), name="home"),    
    path('add-inter', views.AddInterventionView.as_view(), name="add_inter"),
]
