from django.urls import path
from . import views

app_name = 'place'
urlpatterns = [
    path('home', views.home),
    path('place/recommend', views.place_recommend),
    path('place/test/<int:place_id>', views.place_test),
    path('place/list/<int:place_type>', views.place_list),
    path('place/<int:place_id>', views.place_detail, name='detail'),
]
