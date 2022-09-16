from rest_framework import serializers
from ..models import Place


class PlaceListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id','name', 'type', 'address')


class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress')