from unittest.util import _MAX_LENGTH
from djongo import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Place(models.Model):
    _id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    longitude = models.FloatField(null = True)
    latitude = models.FloatField(null = True)
    place_type = models.CharField(max_length=100)
    firstCategory = models.CharField(max_length=30)
    secondCategory = models.CharField(max_length=30)
    placeScore = models.FloatField(null = True)
    placeUrl = models.TextField(null = True)
    class Meta:
        app_label = 'place'
