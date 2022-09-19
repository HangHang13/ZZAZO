from rest_framework import serializers
from ..models import Review
from place.models import Place
from accounts.models import User

class ReviewCreateSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('pk', "userName") 
    class PlaceSerializer(serializers.ModelSerializer):
        class Meta:
            model = Place
            fields = ('id')
    user = UserSerializer(read_only = True)
    place = PlaceSerializer(read_only = True)
    class Meta:
        model = Review
        fields = ('id', 'user', 'place', 'content', 'score')

class ReviewViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'user', 'content', 'score', 'regist')