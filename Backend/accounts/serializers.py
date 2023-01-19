
from multiprocessing import context
from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from accounts.models import Category, User,EmailCheck
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from accounts.utils import Util
from rest_framework.response import Response

class UserCategorySerializer(serializers.ModelSerializer):
  categoryName = serializers.CharField(max_length=100)

  class Meta:
    model = Category
    fields = ('id','categoryName',)
  def validate(self, attrs):
    categoryName = attrs.get('categoryName')
    
  
    return attrs
  def create(self,validate_data):
    return Category.objects.create(**validate_data)

  
    


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
  
  def update(self, instance, validated_data):
    instance.userName = validated_data.get('userName', instance.userName)
    # instance.userNickName = validated_data.get('userNickName', instance.userNickName)
    instance.userBirth = validated_data.get('userBirth', instance.userBirth)
    instance.userPhone = validated_data.get('userPhone', instance.userPhone)
    instance.userGender = validated_data.get('userGender', instance.userGender)
    instance.profileUrl = validated_data.get('profileUrl', instance.profileUrl)
    instance.save()
    return instance




class UserLoginSerializer(serializers.ModelSerializer):
  userEmail = serializers.EmailField(help_text="아이디", max_length=255)
 
  class Meta:
    model = User
    fields = ['userEmail', 'password']

class UserProfileSerializer(serializers.ModelSerializer):

  class UserSerializerCate(serializers.ModelSerializer):
        class Meta:
            model = Category
            fields = ['id', 'categoryName','categoryNumber']
  category = UserSerializerCate(many=True, read_only=True)
  class Meta:
    model = User
    fields = ['id', 'userEmail', 'userName','userNickName','profileUrl','userPhone', 'userBirth','category']

class ChoicesField(serializers.Field):
    def __init__(self, choices, **kwargs):
        self._choices = choices
        super(ChoicesField, self).__init__(**kwargs)

    def to_representation(self, obj):
        return self._choices[obj]

    def to_internal_value(self, data):
        return getattr(self._choices, data)


class ChoicesSerializerField(serializers.SerializerMethodField):
    """
    A read-only field that return the representation of a model field with choices.
    """

    def to_representation(self, value):
        # sample: 'get_XXXX_display'
        method_name = 'get_{field_name}_display'.format(field_name=self.field_name)
        # retrieve instance method
        method = getattr(value, method_name)
        # finally use instance method to return result of get_XXXX_display()
        return method()
        
class UpdateUserSerializer(serializers.Serializer):
    userName = serializers.CharField(max_length=25, source="User.userName")
    profileUrl = serializers.CharField(max_length=255 ,source="User.profileUrl" )
    userBirth = serializers.DateTimeField(source="User.userBirth" )
    userPhone = serializers.CharField(max_length=12,source="User.userPhone")
    userNickName = serializers.CharField(max_length=25, source="User.userNickName")
    userRadius = serializers.IntegerField(source="User.userRadius")
    
    class Meta:
        model = User
        fields=['userName','userNickName', 'userBirth','userPhone','profileUrl','userRadius']

    def validate(self, attrs):
      # print(self.context)
      user = self.context.get('user')
      a=attrs.get('User')
      # print(a.get('userRadius'))
      user = User.objects.filter(userEmail=user).update(
        userNickName=a.get('userNickName'),
        userName=a.get('userName'),
        userBirth=a.get('userBirth'),
        profileUrl=a.get('profileUrl'),
        userPhone=a.get('userPhone'),
        userRadius=a.get('userRadius')
      )

      return attrs
    
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
      raise serializers.ValidationError({'code': 401, "message": "비밀번호 변경 실패"})
    print('비밀번호 유저타입', type(user))
    user.set_password(password)
    user.save()
    return attrs
from django.http import JsonResponse
from django.db.models import Q
class SendPasswordResetEmailSerializer(serializers.Serializer):
  userEmail = serializers.EmailField(max_length=255)
  userBirth = serializers.DateTimeField()
  userName = serializers.CharField(max_length=25)
  class Meta:
    fields = ['userEmail','userName','userBirth', 'link']

  def validate(self, attrs):
    
    username =attrs.get('userName')
    userBirth = attrs.get('userBirth')
    email = attrs.get('userEmail')
    print(attrs,username,userBirth)
    if User.objects.filter(Q(userEmail=email) &Q(userName=username) &Q(userBirth=userBirth)).exists():
      user = User.objects.get(userEmail=email)
      # user1= User.objects.filter(userEmail=email)
   
      uid = urlsafe_base64_encode(force_bytes(user.id))
      # print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token[:15])
  
      user.set_password(token[:15])
      user.save()
      # print(type(user1))
      link = 'http://localhost:8000/api/v1/users/reset-password/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = '해당 비밀번호로 변경 되었습니다. '+ token[:15]
      print(token)
      data = {
        'subject':'ZZAZO 비밀번호 변경 이메일입니다.',
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
  

  class CheckEmail(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    def create(self, validate_data):
  
      return EmailCheck.objects.create(**validate_data)
    class Meta:
      fields = ['password']

    def validate(self, attrs):
      try:
        password = attrs.get('password')
        password2 = attrs.get('password2')
        uid = self.context.get('uid')
        token = self.context.get('token')
        token = PasswordResetTokenGenerator().make_token(user)
        print('Password Reset Token', token[:15])
        if password != password2:
          raise serializers.ValidationError("Password and Confirm Password doesn't match")
        id = smart_str(urlsafe_base64_decode(uid))
        user = User.objects.get(id=id)
        if not PasswordResetTokenGenerator().check_token(user, token):
          raise serializers.ValidationError('Token is not Valid or Expired')
        return attrs
      except DjangoUnicodeDecodeError as identifier:
        PasswordResetTokenGenerator().check_token(user, token)
        raise serializers.ValidationError('Token is not Valid or Expired')


class SendEmailSerializer(serializers.Serializer):
  userEmail = serializers.EmailField(max_length=255)
  # created = serializers.DateTimeField(auto_now_add=True)
  # expired = serializers.DateTimeField()
  
  class Meta:
    fields = ['userEmail']

  def validate(self, attrs):
    email = attrs.get('userEmail')
    token = PasswordResetTokenGenerator().make_token(email)
    user = EmailCheck.objects.get(emailToken=token[:15])
    # user1= User.objects.filter(userEmail=email)
  
    uid = urlsafe_base64_encode(force_bytes(user.id))
    # print('Encoded UID', uid)
    print('Password Reset Token', token[:15])


    # Send EMail
    body = '인증번호를 입력해 주세요. '+ token[:15]
    print(token)
    data = {
      'subject':'ZZAZO 비밀번호 변경 이메일입니다.',
      'body':body,
      'to_email':user.userEmail
    }
    Util.send_email(data)
  
    return attrs
 
# class UpdateRadiusSerializer(serializers.Serializer):
  
#   class Meta:
#       model = User
#       fields=['userName','userRadius']
      
#   def validate(self, attrs):
#       # print(self.context)
#       user = self.context.get('user')
#       a=attrs.get('userRadius')
#       print(a)
#       user = User.objects.filter(userEmail=user).update(userRadius=a)

class UserEmailSerializer(serializers.ModelSerializer):
  class Meta:
      model = User
      fields = ('userEmail',)
  
  def email(self):
    return self.data['userEmail']
    