from rest_framework import serializers
from ..models import Place

'''
class CardListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id','title', 'date', 'appointed_time', 'place')
'''

class PlaceDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Place
        fields = ('id', 'placeName', 'placeAddress')