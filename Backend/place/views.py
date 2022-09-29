from turtle import pos
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers.place import PlaceDetailSerializer, PlaceListSerializer, PlaceTestSerializer
from .serializers.place import PlaceTestSerializer
from plan.serializers.plan import CardListSerializer
from review.serializers.review import ReviewViewSerializer
from review.models import Review
from django.db.models import Avg
from collections import OrderedDict

from plan.models import Card
from place.models import Place
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q
from haversine import haversine

@api_view(['GET'])
def home(request):
    place_list = Card.objects.raw(''' SELECT * FROM plan_card GROUP BY place_id ORDER BY count(place_id) desc
    ''')[:10]
    # place_list = Place.objects.all()[:10]
    # serializer = PlaceListSerializer(place_list, many=True)
    serializer = CardListSerializer(place_list, many=True)
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
    radius = request.data['radius'] if request.data['radius'] else 500
    position  = (latitude, longitude)
    condition = (
                # 1km 기준
                Q(latitude__range  = (latitude - 0.01 * (radius / 1000), latitude + 0.01 * (radius / 1000))) &
                Q(longitude__range = (longitude - 0.015 * (radius / 1000), longitude + 0.015 * (radius / 1000)))
            )
    place_list = (
                Place
                .objects
                .filter(condition)
            )
    near_place_list = [info for info in place_list
                                if haversine(position, (info.latitude, info.longitude)) <= 2 * (radius / 1000)]
    
    # 약속 장소로 등록한 사람이 많고 별점이 높은 곳
    near_place_list.sort(key= lambda x: len(Card.objects.filter(place_id = x._id)))
    
    # 약속 장소로 등록한 곳이 많은 곳
    # many_visited = len(Card.objects.filter(place_id = x['_id']))
    # print(many_visited)
    # 협업 필터링 점수가 높은 곳
    
    # 카테고리가 일치하는 곳
    
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
    radius = request.data['radius'] if request.data['radius'] else 500
    position  = (latitude,longitude)
    condition = (
                # 1km 기준
                Q(latitude__range  = (latitude - 0.01 * (radius / 1000), latitude + 0.01 * (radius / 1000))) &
                Q(longitude__range = (longitude - 0.015 * (radius / 1000), longitude + 0.015 * (radius / 1000))) &
                Q(firstCategory__contains = place_type)
            )
    print(condition)
    place_list = (
                Place
                .objects
                .filter(condition)
            )
    near_place_list = [info for info in place_list if haversine(position, (info.latitude, info.longitude)) <= 2 * (radius / 1000)]
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

