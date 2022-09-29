from django.urls import path
from . import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
app_name = 'place'
urlpatterns = [
    path('home', views.home),
    path('place/recommend', views.place_recommend),
    path('place/test/<str:place_id>', views.place_test),
    path('place/list/<str:place_type>', views.place_list),
    path('place/<str:place_id>', views.place_detail, name='detail'),
]
urlpatterns += staticfiles_urlpatterns()