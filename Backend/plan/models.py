from django.db import models
from django.conf import settings

# Create your models here.
class Card(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cards')
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    date = models.CharField(max_length=10)
    appointed_time = models.CharField(max_length=10)