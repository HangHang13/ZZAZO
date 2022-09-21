from djongo import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Place(models.Model):
    _id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    longitude = models.FloatField()
    latitude = models.FloatField()
    place_type = models.CharField(max_length=100)

    class Meta:
        app_label = 'place'
