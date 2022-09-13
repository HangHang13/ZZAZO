from rest_framework import serializers
from ..models import Card

class CardListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Card
        fields = ('id','title', 'date', 'appointed_time')
