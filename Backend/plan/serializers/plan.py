from rest_framework import serializers
from ..models import Card
from place.models import Place
class CardListSerializer(serializers.ModelSerializer):
    class PlaceSerializer(serializers.ModelSerializer):
        class Meta:
            model = Place
            fields = ('id')
    place = PlaceSerializer(read_only = True)
    class Meta:
        model = Card
        fields = ('id','title', 'date', 'appointed_time', 'place', 'priority')

class CardSerializer(serializers.ModelSerializer):
    class PlaceSerializer(serializers.ModelSerializer):
        class Meta:
            model = Place
            fields = ('id')
    place = PlaceSerializer(read_only = True)
    class Meta:
        model = Card
        fields = ('title', 'date', 'appointed_time', 'place', 'priority')