from django.urls import path
from . import views

app_name = 'review'
urlpatterns = [
    path('<int:place_id>', views.place_review_create_or_create_form),
    path('<int:place_id>/<int:review_id>', views.place_review_update_or_delete),
]
