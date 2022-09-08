
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = [
    path('api/v1/auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('hello/', views.HelloView.as_view(), name='hello'),
]