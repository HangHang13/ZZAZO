# from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser
)
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# from django.utils.translation import ugettext_lazy as _
class UserManager(BaseUserManager):
    # def create_user(self, userEmail, username, password, alias=None):
    #     user = self.model(
    #     userEmail = self.normalize_userEmail(userEmail),
    #             username = username,)
    #     user.set_password(password)p
    def create_user(self, userEmail, password, password2=None, **extra_fields):
        if not userEmail:
            raise ValueError(_("The email must be set"))
        if not password:
            raise ValueError(_("The password must be set"))
        email = self.normalize_email(userEmail)

        user = self.model(userEmail=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, userEmail, password, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_staff') == False:
            raise ValueError('Superuser must have role of Global Admin')
        return self.create_user(userEmail, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    userEmail = models.EmailField(null=False, unique=True)
    userName = models.CharField(max_length=25, unique=True)
    userNickName = models.CharField(max_length=25, unique=True)
    userBirth = models.DateTimeField(auto_now=False, auto_now_add=False)
    userPhone = models.CharField(max_length=12, unique=True)
    userCategory = models.CharField(max_length=25)
    userRadius = models.IntegerField()
    

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
