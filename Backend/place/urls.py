from django.urls import path
from . import views

app_name = 'place'
urlpatterns = [
    path('<str:place_id>/', views.place_detail, name='detail'),
]
