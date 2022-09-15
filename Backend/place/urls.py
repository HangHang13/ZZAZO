from django.urls import path
from . import views

app_name = 'place'
urlpatterns = [
    path('recommend/', views.place_recommend),
    path('list/<str:place_type>/', views.place_list),
    path('<str:place_id>/review/<str:review_id>/', views.place_review_update_or_delete),
    path('<str:place_id>/review/', views.place_review_create),
    path('<str:place_id>/', views.place_detail, name='detail'),
]
