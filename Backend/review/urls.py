from django.urls import path
from . import views

app_name = 'review'
urlpatterns = [
    path('review/<str:place_id>/review/', views.place_review_create),
    path('review/<str:place_id>/review/<str:review_id>/', views.place_review_update_or_delete),
]
