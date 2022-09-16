
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from django.urls import path
from . import views
from accounts.views import (
    SendPasswordResetEmailView, 
    UserChangePasswordView, 
    UserLoginView, 
    UserProfileView, 
    UserRegistrationView, 
    UserPasswordResetView,
    APILogoutView,
    create_category,
    UserChangeView)
app_name = 'accounts'
urlpatterns = [

    #토큰관련
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    #로그인/회원가입

    path('signup/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', APILogoutView.as_view(), name='logout'),

    #유효성검사
    path('checkemail/<str:userEmail>/', views.check_userEmail, name='check_email'),
    path('checkNickName/<str:userNickName>/', views.check_nickName, name='check_nickname'),



    path('me/', UserProfileView.as_view(), name='profile'),
    path('category/', create_category.as_view(), name='category'),
    path('', UserChangeView.as_view(), name='userchange'),



    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
   
]