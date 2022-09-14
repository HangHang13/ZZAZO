from djongo import models
from place.models import Place
from accounts.models import User

# Create your models here.
class Card(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    appointed_place = models.ManyToManyField(Place, related_name='cards')
    title = models.CharField(max_length=100)
    regist = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    date = models.CharField(max_length=10)
    appointed_time = models.CharField(max_length=10)