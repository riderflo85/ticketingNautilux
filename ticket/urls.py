from django.urls import path

from . import views


app_name = "ticket"

urlpatterns = [
    path('', views.ListingInterventionsView.as_view(), name="home"),
    path('inters', views.GetAllInterventionsView.as_view(), name="home"),    
    path('add-inter', views.AddInterventionView.as_view(), name="add_inter"),
    path('remove-inter', views.RemoveInterventionView.as_view(), name="remove_inter"),
    path('update-inter', views.UpdateInterventionView.as_view(), name="update_inter"),
    path('set-done-inter', views.SetDoneInterventionView.as_view(), name="set_done_inter"),
]
