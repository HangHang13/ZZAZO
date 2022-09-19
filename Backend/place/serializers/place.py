from rest_framework import serializers
from ..models import Place
# from . import review

class PlaceTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'name', 'address')

# class PlaceListSerializer(serializers.ModelSerializer):

#     placeScore = serializers.IntegerField(source='review.score.average')
    
#     class Meta:
#         model = Place
#         fields = ('id', 'name', 'address', 'placeScore')

# class PlaceRecommendListSerializer(serializers.ModelSerializer):

#     placeScore = serializers.IntegerField(source='review.score.average')
    
#     class Meta:
#         model = Place
#         fields = ('id', 'placeName', 'placeAddress', 'placeScore', 'placeType')

# class PlaceDetailSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = Place
#         fields = ('id', 'placeName', 'placeAddress', 'score')