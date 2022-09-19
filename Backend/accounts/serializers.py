
from multiprocessing import context
from unittest.util import _MAX_LENGTH
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
  userEmail = serializers.EmailField(max_length=255)
 
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
    fields = ['id', 'userEmail', 'userName','userNickName','profileUrl','userPhone', 'categoryName']

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
    userBirth = serializers.DateTimeField(source="User.userBirth", )
    userPhone = serializers.CharField(max_length=12,source="User.userPhone", )
    # GENDER_CHOICES = (
    #     (u'M', u'Male'),
    #     (u'F', u'Female'),
    # )
    userNickName = serializers.CharField(max_length=25, source="User.userNickName")
    userGender = serializers.CharField(max_length=2,source="User.userGender", allow_blank=True )
    userRadius = serializers.IntegerField(source="User.userRadius")
    class Meta:
        model = User
        fields=['userName','userNickName', 'userBirth','userPhone','userGender','profileUrl','userRadius']
     

   

    
    # def validate(self, instance, validated_data):
    #     instance.userName = validated_data['userName']
    #     instance.profileUrl = validated_data['profileUrl']
    #     instance.userBirth = validated_data['userBirth']
    #     instance.userPhone = validated_data['userPhone']
    #     instance.userGender = validated_data['userGender']
    #     user = self.context.get('user')
    #     print('유저',user)
    #     user.update(instance.userName)
    #     user.save()
    #     instance.save()

    #     return instance
    def validate(self, attrs):
      # print(self.context)
      user = self.context.get('user')
      a=attrs.get('User')
      # print(a.get('userRadius'))
      user = User.objects.filter(userEmail=user).update(userNickName=a.get('userNickName'),userName=a.get('userName'),userBirth=a.get('userBirth'), 
      userGender=a.get('userGender'),
      profileUrl=a.get('profileUrl'),
      userPhone=a.get('userPhone'),
      userRadius=a.get('userRadius')
       )

    
      # user.userName = attrs.get('userName')
      
      # user.profileUrl = attrs.get('profileUrl')
      # user.userBirth = attrs.get('userBirth')
      # user.Birth = attrs.get('Birth')
      # user.userGender = attrs.get('userGender')
      # user.update(userName=user.userName, profileUrl=user.profileUrl)
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
    user.set_password(password)
    user.save()
    return attrs
from django.http import JsonResponse
class SendPasswordResetEmailSerializer(serializers.Serializer):
  userEmail = serializers.EmailField(max_length=255)
  userPhone = serializers.CharField(max_length=12)
  userName = serializers.CharField(max_length=25)
  class Meta:
    fields = ['userEmail','userName','userPhone', 'link']

  def validate(self, attrs):
    username =attrs.get('userName')
    userPhone = attrs.get('userPhone')
    email = attrs.get('userEmail')
    print(attrs,username,userPhone)
    if User.objects.filter(userEmail=email, userName=username, userPhone=userPhone).exists():
      user = User.objects.get(userEmail = email)
      uid = urlsafe_base64_encode(force_bytes(user.id))
      print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      print('Password Reset Token', token)
      a='12345a'
      user.set_password(a)
      print(user)
      link = 'http://localhost:8000/api/v1/users/reset-password/'+uid+'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = '링크를 눌러 비밀번호를 변경하세요 '+ a
      print(token)
      data = {
        'subject':'ZZAZO 비밀번호 변경 이메일입니다.',
        'body':body,
        'to_email':user.userEmail
      }
      # Util.send_email(data)
    
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
  