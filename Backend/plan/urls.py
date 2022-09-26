from django.urls import path
from . import views

app_name = 'plan'
urlpatterns = [
    path('list', views.list, name='list'),
    path('<int:card_id>', views.plan_put_or_delete, name='plan_put_or_delete'),
    path('',views.plan_create)

]
