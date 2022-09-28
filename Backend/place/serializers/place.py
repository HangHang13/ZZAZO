from rest_framework import serializers
from ..models import Place
from review.models import Review

class PlaceTestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('_id', 'name', 'address')

class PlaceTest2Serializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = '__all__'

class PlaceListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('_id', 'name', "firstCategory", "secondCategory", "place_type", 'address', "latitude", 'longitude')

class PlaceRecommendListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('_id', 'name', "firstCategory", "secondCategory", 'place_type', 'address')

class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('_id', 'name', "firstCategory", "secondCategory", 'place_type', 'address')
