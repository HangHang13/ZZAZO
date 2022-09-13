from tkinter import Place
from django.db import models
from django.conf import settings

# Create your models here.
class Card(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cards')
#    appointed_place = models.ManyToManyField(Place, related_name='appointed_cards')
    title = models.CharField(max_length=100)
    regist = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    date = models.CharField(max_length=10)
    appointed_time = models.CharField(max_length=10)