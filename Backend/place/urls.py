from django.urls import path
from . import views

app_name = 'place'
urlpatterns = [
    path('zzazohome', views.home),
    path('place/recommend', views.place_recommend),
    path('place/list/<str:firstCategory>', views.place_list),
    path('place/<int:place_id>', views.place_detail, name='detail'),
]
