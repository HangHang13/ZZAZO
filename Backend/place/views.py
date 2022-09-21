from turtle import pos
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers.place import PlaceDetailSerializer, PlaceListSerializer, PlaceTestSerializer
from .serializers.place import PlaceTestSerializer
from review.serializers.review import ReviewViewSerializer
from review.models import Review
from django.db.models import Avg
from collections import OrderedDict


from place.models import Place
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q
from haversine import haversine

@api_view(['GET'])
def home(request):
    place_list = Place.objects.all()[:10]
    serializer = PlaceListSerializer(place_list, many=True)
    data = {'Place': serializer.data}
    code = 200
    message = "추천 목록"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)
    
    
@api_view(['POST'])
def place_recommend(request):
    longitude = float(request.data['longitude'])
    latitude  = float(request.data['latitude'])
    position  = (latitude, longitude)
    condition = (
                # 1km 기준
                Q(latitude__range  = (latitude - 0.01, latitude + 0.01)) &
                Q(longitude__range = (longitude - 0.015, longitude + 0.015))
            )
    place_list = (
                Place
                .objects
                .filter(condition)
            )
    near_place_list = [info for info in place_list
                                if haversine(position, (info.latitude, info.longitude)) <= 2]
    serializer = PlaceListSerializer(near_place_list, many=True)
    for i in range(len(serializer.data)):
        for key, val in serializer.data[i].items():
            if key == "_id":
                placeScore = Review.objects.filter(place=val).aggregate(placeScore = Avg('score'))
                serializer.data[i].update(placeScore)
                break
    data = {'Place': serializer.data}
    code = 200
    message = "추천 목록"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)


@api_view(['POST'])
def place_list(request, place_type):
    longitude = float(request.data['longitude'])
    latitude  = float(request.data['latitude'])
    position  = (latitude,longitude)
    condition = (
                # 1km 기준
                Q(latitude__range  = (latitude - 0.01, latitude + 0.01)) &
                Q(longitude__range = (longitude - 0.015, longitude + 0.015)) &
                Q(place_type__contains=place_type)
            )
    place_list = (
                Place
                .objects
                .filter(condition)
            )
    near_place_list = [info for info in place_list if haversine(position, (info.latitude, info.longitude)) <= 2]
    serializer = PlaceListSerializer(near_place_list, many=True)
    for i in range(len(serializer.data)):
        for key, val in serializer.data[i].items():
            if key == "_id":
                placeScore = Review.objects.filter(place=val).aggregate(placeScore = Avg('score'))
                serializer.data[i].update(placeScore)
                break
    data = {'Place': serializer.data}
    code = 200
    message = "장소 목록"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)

@api_view(['GET'])
def place_test(request, place_id):
    place = Place.objects.filter(place_type__contains = place_id)
    serializer = PlaceTestSerializer(place , many=True)
    data = {'Place' : serializer.data}
    code = 200
    message = "장소 로드"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)
    
@api_view(['GET'])
def place_detail(request, place_id):
    place = Place.objects.get(_id = place_id)
    print(place)
    review = Review.objects.filter(place = place_id)
    placeScore =  Review.objects.filter(place=place_id).aggregate(placeScore = Avg('score'))
    placeSerializer = PlaceDetailSerializer(place)
    placeData = (dict(placeSerializer.data))
    placeData.update(placeScore)
    reviewSerializer = ReviewViewSerializer(review, many=True)
    data = {
        'Place': placeData,
        'Review' : reviewSerializer.data,
        }
    code = 200
    message = "장소 상세보기 로드"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)

