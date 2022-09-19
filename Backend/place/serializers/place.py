from rest_framework import serializers
from ..models import Place
# from . import review

class PlaceTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('_id', 'name', 'address')

class PlaceTest2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = '__all__'

class PlaceListSerializer(serializers.ModelSerializer):

    placeScore = serializers.IntegerField(source='review.score.average')
    
    class Meta:
        model = Place
        fields = ('_id', 'name', 'address', 'placeScore')

class PlaceRecommendListSerializer(serializers.ModelSerializer):

    placeScore = serializers.IntegerField(source='review.score.average')
    
    class Meta:
        model = Place
        fields = ('_id', 'placeName', 'placeAddress', 'placeScore', 'placeType')

class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('_id', 'placeName', 'placeAddress', 'score')