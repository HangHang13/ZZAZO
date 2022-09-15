from rest_framework import serializers
from ..models import Place


class PlaceListSerializer(serializers.ModelSerializer):

    placeScore = serializers.IntegerField(source='review.score.average')
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress', 'placeScore')


class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress')