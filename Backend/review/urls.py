from django.urls import path
from . import views

app_name = 'review'
urlpatterns = [
    path('<str:place_id>', views.place_review_create),
    path('<str:place_id>/<str:review_id>', views.place_review_update_or_delete),
]
