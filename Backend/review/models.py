from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from place.models import Place

class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    place = models.ForeignKey(Place, on_delete=models.DO_NOTHING, db_constraint=False, related_name='reviews')
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