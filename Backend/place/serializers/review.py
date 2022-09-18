from rest_framework import serializers
from ..models import Place, Review

class ReviewCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = ('id', 'user', 'place', 'content', 'score')

class ReviewViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'user', 'content', 'score', 'regist')