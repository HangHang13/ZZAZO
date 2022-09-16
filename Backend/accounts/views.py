from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView 
from accounts import serializers
from accounts.serializers import (
    SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer,
    UserProfileSerializer, UserRegistrationSerializer,UserCategorySerializer, UpdateUserSerializer)
from django.contrib.auth import authenticate
from accounts.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Category, User
from django.views.decorators.csrf import csrf_exempt

# Generate Token Manually


#이메일 인증 확인

# def verificationEmail() 
@csrf_exempt
@api_view(['GET'])
def check_userEmail(request, userEmail):

  try:
        # 중복 검사 실패
      _id = User.objects.get(userEmail=userEmail)
      print(_id)
  except:
        # 중복 검사 성공
      _id = None
  if _id is None:
      duplicate = "사용 가능한 아이디입니다"
      context = {'code': 200, 'message': duplicate}
  else:
      duplicate = "사용 중인 아이디입니다."
      context = {'code': 401, 'message': duplicate}

  return Response(context) 


@csrf_exempt
@api_view(['GET'])
def check_nickName(request, userNickName):
  #  user = request.GET.get('userNickName')
   user = userNickName

   try:
        # 중복 검사 실패
      _id = User.objects.get(userNickName=f'{user}')
   except:
        # 중복 검사 성공
      _id = None
   if _id is None:
      duplicate = "사용 가능한 닉네임입니다"
      context = {'code': 200,
       'message': duplicate}
   else:
      duplicate = "사용 중인 닉네임입니다."
      context = {'code': 401, 
      'message': duplicate}
   return Response(context) 
  # if user:
  #   res = {'사용가능한 닉네임입니다.'}
  #   Response (res)
  # else:
  #   res = {'이미 가입된 사용자입니다.'}
  #   Response (res)

#회원탈퇴
# class UserDelete(APIView):
#   permission_classes = (IsAuthenticated,)
  
# logout
class APILogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if self.request.data.get('all'):
            token: OutstandingToken
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response({"status": "OK, goodbye, all refresh tokens blacklisted"})
        refresh_token = self.request.data.get('refresh_token')
        token = RefreshToken(token=refresh_token)
        token.blacklist()
        return Response({"code": 200,
                          "message": "로그아웃 되었습니다.",})

# @api_view(['POST'])
# def create_category(request):
#   user = request.user
#   category = get_object_or_404(Category)

class create_category(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    print(request.data)
    serializer = UserCategorySerializer(data=request.data)
    print('카테고리',serializer)

    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({'msg':'Password Reset Successfully','user' : user}, status=status.HTTP_200_OK)


def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):
 
  renderer_classes = [UserRenderer]
 
  def post(self, request, format=None):
    print(request.data)
    serializer = UserRegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    token = get_tokens_for_user(user)
   
   

    if user:
      return Response({ 'code':200,  'message':'회원가입에 성공하였습니다.', 'userEmail' : user.userEmail}, status=status.HTTP_201_CREATED)
    else:
      return Response({'code':401,  'message':'회원가입에 실패하였습니다.', }, status=status.HTTP_401_UNAUTHORIZED)


class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    username= serializer.data.get('userEmail')
    password = serializer.data.get('password')
    print(username, password)

    # user = User.objects.get(userEmail=username)
    # print(user.check_password(f'{password}'))
   
   
    user = authenticate(username = username, password = f'{password}')
    print('유저',user)
    if user is not None:
      token = get_tokens_for_user(user)
      return Response({'code': '200', 'message':'로그인', 'token': token }, status=status.HTTP_200_OK)
    else:
      return Response({"code": 404,
                      "message": "아이디 혹은 비밀번호를 확인해주세요."}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)



class UserChangeView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  def post(self, request, format=None):
    # serializer = UpdateUserSerializer
    serializer = UpdateUserSerializer(data=request.data, context={'user':request.user})
    print(serializer)
    serializer.is_valid(raise_exception=True)
    print(serializer )
    return Response({ 'code':200,  'message':'회원가입 수정에 성공하였습니다.'}, status=status.HTTP_200_OK)

    if user:
      return Response({ 'code':200,  'message':'회원가입 수정에 성공하였습니다.', 'userEmail' : user.userEmail}, status=status.HTTP_201_CREATED)


class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    if serializer.is_valid(raise_exception=True):
      return Response({'code': 200, "message": "비밀번호 변경"}, status=status.HTTP_200_OK)
    else:
      return Response({'code': 401, "message": "비밀번호 변경 실패"}, status=status.HTTP_401_UNAUTHORIZED)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      return Response({'code': 200, "message": "비밀번호 변경"}, status=status.HTTP_200_OK)
    else:
      return Response({'code': 401, "message": "비밀번호 변경 실패"}, status=status.HTTP_401_UNAUTHORIZED)
    

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

