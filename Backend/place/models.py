from djongo import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Place(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    latitude = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    regist = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'place'

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    content = models.CharField(max_length=100, null=False)
    score = models.IntegerField(
        default = 3,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(5)
        ]
    )
    regist = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'place'