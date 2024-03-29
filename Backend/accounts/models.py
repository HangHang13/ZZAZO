from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser
)
from django.conf import settings
from django.utils import timezone
# from django.utils.translation import ugettext_lazy as _
class UserManager(BaseUserManager):
    def create_user(self, userEmail, userName, userNickName, userBirth, userPhone,userGender, password=None, password2=None):
        user = self.model(
        userEmail = self.normalize_email(userEmail),
                userName = userName,
                userNickName=userNickName,
                userBirth=userBirth,
                userPhone=userPhone,
                userGender=userGender
                )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, userEmail, userName, userNickName, userBirth, userPhone,userGender, password=None, password2=None):
        user = self.model(
        userEmail = self.normalize_email(userEmail),
                userName = userName,
                userNickName=userNickName,
                userBirth=userBirth,
                userPhone=userPhone,
                userGender=userGender,
                is_staff= True
                )
        user.set_password(password)
        user.save()
        return user
    

class Category(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,related_name='category')
    categoryName = models.CharField(max_length=20,null=True,blank=True)
    categoryNumber = models.CharField(max_length=20,null=True,blank=True)
    def __str__(self):
        return self.categoryName

class User(AbstractBaseUser, PermissionsMixin):
    userEmail = models.EmailField(null=False, unique=True)
    userName = models.CharField(max_length=25)
    userNickName = models.CharField(max_length=25, unique=True)
    profileUrl = models.CharField(max_length=255)
    GENDER_CHOICES = (
        (u'M', u'Male'),
        (u'F', u'Female'),
    )
    userBirth = models.DateField()
    userPhone = models.CharField(max_length=12)
    userGender = models.CharField(max_length=2, choices=GENDER_CHOICES, default='M', null=True)
    userUpdate = models.DateTimeField(auto_now=True)
    userRegist = models.DateTimeField(auto_now_add=True)
    userRadius = models.IntegerField(null=False, default=500) # 반경 500m 
    

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    #로그인 아이디
    USERNAME_FIELD = "userEmail"
    #필수로 받아야 하는 것들
    REQUIRED_FIELDS = []
    def __str__(self):
        return self.userEmail
    
    def radius(self):
        return self.userRadius


class EmailCheck(models.Model):
    emailToken = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    is_expired = models.BooleanField(default=False)