
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
   
    APILogoutView,
    create_category,
    UserChangeView,
    Delete_user,
    Getcheck_email
   )
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


    #프로필확인
    path('me/', UserProfileView.as_view(), name='profile'),
    path('category/', create_category.as_view(), name='category'),
    #프로필 변경
    path('', UserChangeView.as_view(), name='userchange'),
    #아이디찾기
    path('findEmail/', views.find_userEmail, name='find_email'),
    #회원탈퇴
    # path('<str:userEmail>/', views.delete_user, name='delete_user'),
    path('<str:userEmail>/', Delete_user.as_view(), name='delete_user'),
    
    #비밀번호 변경
    path('pw/', UserChangePasswordView.as_view(), name='changepassword'),
    #비밀번호 찾기
    path('findpw/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    #이메일 인증번호
    path('checkEmail/<str:userEmail>/',views.chceck_email),
    #이메일 인증번호 받기
    path('getcheckEmail/',views.getchceck_email, name='getchceck_email'),
    path('getcheckEmail1/',Getcheck_email.as_view(),name='getchceck_email'),
    # path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
   
]