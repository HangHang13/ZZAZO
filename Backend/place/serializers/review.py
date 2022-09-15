from rest_framework import serializers
from ..models import Place, Review

class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress')