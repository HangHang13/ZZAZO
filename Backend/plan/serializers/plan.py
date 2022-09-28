from rest_framework import serializers
from ..models import Card
from place.models import Place
class CardListSerializer(serializers.ModelSerializer):
    # class PlaceSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = Place
    #         fields = ('id')
    # place = PlaceSerializer(read_only = True)
    class Meta:
        model = Card
        fields = ('cardId','title', 'date', 'appointed_time', 'place_id', 'priority',
        'name', 'place_type','address')

class CardSerializer(serializers.ModelSerializer):
    # class PlaceSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = Place
    #         fields = ('id')
    # place = PlaceSerializer(read_only = True)
    class Meta:
        model = Card
        fields = ('title', 'date', 'appointed_time', 'place_id', 'priority', 'cardId', 'place_type','address', 'latitude', 'longitude', 'isMain', 'name')