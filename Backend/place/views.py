from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers.place import PlaceDetailSerializer, PlaceListSerializer, PlaceTestSerializer
from .serializers.place import PlaceTestSerializer
from review.serializers.review import ReviewViewSerializer
from review.models import Review



from place.models import Place
from drf_yasg.utils import swagger_auto_schema
from django.db.models import Q
import haversine

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
    print("post")
    longitude = float(request.data['longitude'])
    latitude  = float(request.data['latitude'])
    print(longitude)
    print(latitude)
    position  = (latitude,longitude)
    print(position)
    condition = (
                # 1km 기준
                Q(latitude__range  = (latitude - 0.01, latitude + 0.01)) &
                Q(longitude__range = (longitude - 0.015, longitude + 0.015)) &
                Q(place_type__contains=place_type)
            )
    print(condition)
    place_list = (
                Place
                .objects
                .filter(condition)
            )
    print(place_list)
    near_place_list = [info for info in place_list
                                if haversine(position, (info.latitude, info.longitude)) <= 2]
    print(near_place_list)

    
    serializer = PlaceListSerializer(near_place_list, many=True)
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
    place = get_object_or_404(Place, pk = place_id)
    placeSerializer = PlaceDetailSerializer(place)
    print(placeSerializer)
    review = Review.object.using('default').get(place = place_id)
    print(review)
    reviewSerializer = ReviewViewSerializer(review, many=True)
    data = {
        'Place': placeSerializer.data, 
        'Review' : reviewSerializer.data
        }
    code = 200
    message = "장소 상세보기 로드"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)

