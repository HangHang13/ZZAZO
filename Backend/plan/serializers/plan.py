from rest_framework import serializers
from ..models import Card

class CardListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('cardId','title', 'date', 'appointed_time', 'place_id', 'priority',
        'name', 'place_type','address', 'latitude', 'longitude')        

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('title', 'date', 'appointed_time', 'place_id', 'priority', 'cardId', 'place_type','address', 'latitude', 'longitude', 'isMain', 'name')
