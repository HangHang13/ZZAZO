from rest_framework import serializers
from ..models import Place
from review.models import Review

class PlaceListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('_id', 'name', "firstCategory", "secondCategory", "place_type", 'address', "latitude", 'longitude', 'placeScore', 'placeUrl')

class PlaceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('_id', 'name', "firstCategory", "secondCategory", 'place_type', 'address', 'placeScore', 'placeUrl')




