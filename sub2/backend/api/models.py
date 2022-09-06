from django.utils import timezone
from django.db import models
from djongo import models

class Store(models.Model):
    id = models.IntegerField(primary_key=True)
    store_name = models.CharField(max_length=50)
    branch = models.CharField(max_length=20, null=True)
    area = models.CharField(max_length=50, null=True)
    tel = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=200, null=True)
    latitude = models.FloatField(max_length=10, null=True)
    longitude = models.FloatField(max_length=10, null=True)
    category = models.CharField(max_length=200, null=True)

    @property
    def category_list(self):
        return self.category.split("|") if self.category else []


class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    class Meta:
        abstract = True

class Entry(models.Model):
    blog = models.EmbeddedField(
        model_container=Blog,
    )
    
    headline = models.CharField(max_length=255)

# e = Entry()
# e.blog = {
#     'name': 'Djongo'
# }
# e.headline = 'The Django MongoDB connector'
# e.save()


# e = Entry()
# e.blog = [
#     {'name': 'Djongo'}, {'name': 'Django'}, {'name': 'MongoDB'}
# ]
# e.headline = 'Djongo is the best Django and MongoDB connector'
# e.save()