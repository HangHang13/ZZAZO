from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser
)
# from django.utils.translation import ugettext_lazy as _
class UserManager(BaseUserManager):
    # def create_user(self, userEmail, username, password, alias=None):
    #     user = self.model(
    #     userEmail = self.normalize_userEmail(userEmail),
    #             username = username,)
    #     user.set_password(password)
    #     user.save()
    #     return user
    def create_user(self, userEmail, username, password, alias=None):
        user = self.model(
        userEmail = self.normalize_userEmail(userEmail),
                username = username,)
        user.set_password(password)
        user.save()
        return user

    # def create_superuser(self, userEmail, nickname, password):
    #    """
    #     주어진 이메일, 닉네임, 비밀번호 등 개인정보로 User 인스턴스 생성
    #     단, 최상위 사용자이므로 권한을 부여한다. 
    #     """

    #     user = self.create_user(
    #         userEmail=userEmail,
    #         password=password,
    #         nickname=nickname,
    #     )

    #     user.is_superuser = True
    #     user.save(using=self._db)
    #     return user
    def create_superuser(self, userEmail, username, password):
        self.create_user(userEmail, username, password)
        user = self.model(
        userEmail = self.normalize_userEmail(userEmail),
                username = username,)
        user.is_staff()
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    userEmail = models.EmailField(null=False, unique=True)
    userName = models.CharField(max_length=25, unique=True)
    userNickName = models.CharField(max_length=25, unique=True)
    userBirth = models.DateTimeField(auto_now=False, auto_now_add=False)

    GENDER_CHOICES = (
        (u'M', u'Male'),
        (u'F', u'Female'),
    )

    userGender = models.CharField(max_length=2, choices=GENDER_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = "userEmail"
    REQUIRED_FIELDS = ["userName",]