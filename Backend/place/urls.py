from django.urls import path
from . import views

app_name = 'plan'
urlpatterns = [
    path('<str:place_id>/', views.place_detail, name='detail'),
]
