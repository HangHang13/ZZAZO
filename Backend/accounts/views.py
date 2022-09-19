from audioop import lin2adpcm
import re
from winreg import REG_QWORD
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView 
from accounts import serializers
from accounts.serializers import (
    SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserLoginSerializer, UserPasswordResetSerializer,
    UserProfileSerializer, UserRegistrationSerializer,UserCategorySerializer, UpdateUserSerializer,SendEmailSerializer)
from django.contrib.auth import authenticate
from accounts.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Category, EmailCheck, User
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from accounts.utils import Util
# Generate Token Manually


#이메일 인증 확인
# {
# "userName": String,
# ”userPhone” : String,
# "userBirth" : String,
# }
# def verificationEmail() 


#아이디 찾기
@csrf_exempt
@api_view(['GET'])
def find_userEmail(request):
 
  userName = request.data.get('userName')
  userPhone = request.data.get('userPhone')
  userBirth = request.data.get('userBirth')
  a= User.objects.filter(userBirth=userBirth)
  print(a)
  if User.objects.filter(Q(userName=userName) & Q(userPhone=userPhone) & Q(userBirth=userBirth)).exists():
      user = User.objects.get(userName=userName)
 

      context = {'code': 200, 'message': "아이디 찾기 성공", 'userEmail' : user.userEmail}
      return Response(context) 
  else:

    context = {'code': 401, 'message': "고객님의 정보와 일치하는 아이디가 없습니다."}

   
    return Response(context)


#이메일 중복확인
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

#닉네임 중복확인
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


#로그아웃
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

#회원가입
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


#로그인
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

#회원 탈퇴


@csrf_exempt
@api_view(['DELETE'])
def delete_user(request, userEmail):
  
    permission_classes = [IsAuthenticated]
    if request.method == 'DELETE':
        try:
            user = User.objects.get(userEmail=userEmail)
            print(user)
            user.delete()
            res={
                "code": 200,
                "message": "회원탈퇴가 완료되었습니다."
                }
            return Response(res)
        except Exception as e: 
          print(e)
          res={
                "code": 401,
                "message": "회원 탈퇴 실패."
                }
          return Response(res)

    else:
        return Response('"DELETE" 요청을 보내세요!')


class Delete_user(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  def delete(self, request,userEmail):
      print('클래스 삭제',userEmail)
      print(request.data)
      if User.objects.get(userEmail=userEmail):
            user = User.objects.get(userEmail=userEmail)
            print(user)
            user.delete()
            res={
                "code": 200,
                "message": "회원탈퇴가 완료되었습니다."
                }
            return Response(res)
      else: 
          
          res={
                "code": 401,
                "message": "회원 탈퇴 실패."
                }
          return Response(res)
#프로필
class UserProfileView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def get(self, request, format=None):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)



class UserChangeView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]

  def put(self, request, format=None):
    # serializer = UpdateUserSerializer
  
 
    serializer = UpdateUserSerializer(data=request.data, context={'user':request.user})
 
    serializer.is_valid(raise_exception=True)

    res= {
      'code':200,
      'message':'회원정보가 수정되었습니다',
      "message": "회원정보가 수정되었습니다.",
      "userName":serializer.data.get('userName'),
      "userBirth" : serializer.data.get('userBirth'),
      "userNickName":serializer.data.get('userNickName'),
      "userPhone": serializer.data.get('userPhone'),
      "userRadius": serializer.data.get('userRadius'),
      "profileUrl" : serializer.data.get('profileUrl'),
      

    }
    return Response(res, status=status.HTTP_200_OK)

    if user:
      return Response({ 'code':200,  'message':'회원가입 수정에 성공하였습니다.', 'userEmail' : user.userEmail}, status=status.HTTP_201_CREATED)


class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  
  def put(self, request, format=None):
    
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
      res= {
        "code": 200, 
        "message": "비밀번호 찾기 성공",
      
      }
      return Response(res, status=status.HTTP_200_OK)
    else:
      return Response({'code': 401, "message": "비밀번호 찾기 실패"}, status=status.HTTP_401_UNAUTHORIZED)
    

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)



#이메일 인증번호 전송
import random
import string
@csrf_exempt
@api_view(['POST'])
def chceck_email(request, userEmail):
  print('rla')
  print(request.data)
  # userEmail = request.data.get('userEmail')

  token  = "".join([random.choice(string.ascii_letters) for _ in range(10)]) # 섞어서

  EmailCheck.objects.create(emailToken=token)
  res={
        "code": 200,
        "message": "인증번호를 전송했습니다."
        }
  # Send EMail
  body = '인증번호를 입력해 주세요. '+ token
  print(token)
  data = {
      'subject':'ZZAZO 회원가입 인증번호 이메일입니다.',
      'body':body,
      'to_email':userEmail
    }
  Util.send_email(data)
  return Response(res)

#이메일 인증번호 확인
@csrf_exempt
@api_view(['GET'])
# def chceck_email(request, token):
