from rest_framework import serializers
from ..models import Place, Review
from . import review

class PlaceListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id','name', 'type', 'address')



class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress', 'score')