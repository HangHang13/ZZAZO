from django.urls import path
from . import views

app_name = 'place'
urlpatterns = [
    path('home/', views.home),
    path('place/recommend/', views.place_recommend),
    path('place/list/<str:place_type>/', views.place_list),
    path('place/<str:place_id>/review/<str:review_id>/', views.place_review_update_or_delete),
    path('place/<str:place_id>/review/', views.place_review_create),
    path('place/<str:place_id>/', views.place_detail, name='detail'),
]
