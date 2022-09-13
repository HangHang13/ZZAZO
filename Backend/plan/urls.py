from django.urls import path
from . import views

app_name = 'plan'
urlpatterns = [
    path('list/', views.list, name='list'),

]
