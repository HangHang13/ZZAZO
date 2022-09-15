# from django.contrib.auth import authenticate
# from django.contrib.auth.models import update_last_login

# from rest_framework import serializers
# from rest_framework_simplejwt.tokens import RefreshToken

# from .models import User


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         user = User(**validated_data)
#         user.set_password(password)
#         user.save()
#         return user

# class UserSerializer2(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = '__all__'

#     def create(self, validated_data):
#         user = User.objects.create(email=validated_data['email'],
#                                        name=validated_data['name']
#                                          )
#         user.set_password(validated_data['password'])
#         user.save()
#         return user



from rest_framework import serializers
from accounts.models import Category, User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from accounts.utils import Util
from rest_framework.response import Response

class UserCategorySerializer(serializers.ModelSerializer):
  categoryName = serializers.CharField(max_length=100, write_only=True)
  
  class Meta:
    model = Category
    fields = ('id','categoryName')

class UserRegistrationSerializer(serializers.ModelSerializer):
  # We are writing this becoz we need confirm password field in our Registratin Request
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = User
    fields=['userEmail', 'userName', 'userNickName', 'password','password2', 'userBirth','userPhone','userGender']
    extra_kwargs={
      'password':{'write_only':True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    print('atttr' , attrs)
    if password != password2:
    
      raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")
    
    return attrs

  def create(self, validate_data):
    
    return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
  userEmail = serializers.EmailField(max_length=255)
  # print('시리얼라이져',userEmail)
  class Meta:
    model = User
    fields = ['userEmail', 'password']

class UserProfileSerializer(serializers.ModelSerializer):

  class UserSerializerCate(serializers.ModelSerializer):
        class Meta:
            model = Category
            fields = ('categoryName')
  categoryName = UserCategorySerializer(read_only=True)
  class Meta:
    model = User
    fields = ['id', 'userEmail', 'userName','categoryName']

class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    user.set_password(password)
    user.save()
    return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['userEmail']

  def validate(self, attrs):
    email = attrs.get('userEmail')
    if User.objects.filter(userEmail=email).exists():
      user = User.objects.get(userEmail = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token)
      link = 'http://localhost:8000/api/v1/accounts/reset-password/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = '링크를 눌러 비밀번호를 변경하세요 '+link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.userEmail
      }
      Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('가입되지 않은 사용자 입니다.')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')
  