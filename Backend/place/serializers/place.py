from rest_framework import serializers
from ..models import Place, Review
from . import review


class PlaceListSerializer(serializers.ModelSerializer):

    placeScore = serializers.IntegerField(source='review.score.average')
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress', 'placeScore')

class PlaceRecommendListSerializer(serializers.ModelSerializer):

    placeScore = serializers.IntegerField(source='review.score.average')
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress', 'placeScore', 'placeType')

class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress', 'score')