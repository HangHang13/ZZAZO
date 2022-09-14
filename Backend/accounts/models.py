from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser
)
from django.utils import timezone
# from django.utils.translation import ugettext_lazy as _
class UserManager(BaseUserManager):
    # def create_user(self, userEmail, username, password, alias=None):
    #     user = self.model(
    #     userEmail = self.normalize_userEmail(userEmail),
    #             username = username,)
    #     user.set_password(password)
    #     user.save()
    #     return user
    def create_user(self, userEmail, userName, password, alias=None):
        user = self.model(
        userEmail = self.normalize_email(userEmail),
                userName = userName,)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, userEmail, password, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)

    #     user = self.create_user(
    #         userEmail=userEmail,
    #         password=password,
    #         nickname=nickname,
    #     )

    #     user.is_superuser = True
    #     user.save(using=self._db)
    #     return user
    def create_superuser(self, userEmail, userName, password):
        self.create_user(userEmail, userName, password)
        user = self.model(
        userEmail = self.normalize_email(userEmail),
                userName = userName,)
        user.is_staff()
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    userEmail = models.EmailField(null=False, unique=True)
    userName = models.CharField(max_length=25, unique=True)
    userNickName = models.CharField(max_length=25, unique=True)
    # userBirth = models.DateTimeField(auto_now=False, auto_now_add=False, default=timezone.now)

    GENDER_CHOICES = (
        (u'M', u'Male'),
        (u'F', u'Female'),
    )

    userGender = models.CharField(max_length=2, choices=GENDER_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    userUpdate = models.DateTimeField(auto_now=True)
    userRegist = models.DateTimeField(auto_now_add=True) 
    objects = UserManager()
    #로그인 아이디
    USERNAME_FIELD = "userEmail"
    #필수로 받아야 하는 것들
    REQUIRED_FIELDS = []
    def __str__(self):
        return self.userEmail
