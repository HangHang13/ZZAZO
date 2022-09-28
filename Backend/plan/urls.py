from django.urls import path
from . import views

app_name = 'plan'
urlpatterns = [
    path('list/', views.list, name='list'),
    path('list/<int:cardId>/', views.listCardId, name='listCardId'),
    path('<int:cardId>/', views.plan_detail_put_or_delete, name='plan_detail_put_or_delete'),
    path('',views.plan_create)
]
