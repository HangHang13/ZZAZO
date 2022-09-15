from typing import Type
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers.place import PlaceDetailSerializer, PlaceListSerializer
from .serializers.review import ReviewCreateSerializer

from place.models import Place, Review

from django.db.models import Q
import haversine

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
    near_place_list = [info for info in place_list
                                if haversine(position, (info.latitude, info.longitude)) <= 2]
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
def place_detail(request, place_id):
    place = get_object_or_404(Place, pk = place_id)
    serializer = PlaceDetailSerializer(place)
    data = {'Place': serializer.data}
    code = 200
    message = "장소 상세보기 로드"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)

@api_view(['POST'])
def place_review_create(request, place_id):
    serializer = ReviewCreateSerializer(data=request.data)
    place = get_object_or_404(Place, pk = place_id)
    if serializer.is_valid(raise_exception=True):
        # serializer.save(user=request.user, place=place)
        code = 200
        message = "리뷰 생성"
        res = {
            "code": code,
            "message": message,
        }
        return Response(res, status=status.HTTP_201_CREATED)
    
    else:
        code = 401
        message = "리뷰 생성 실패"
        res = {
            "code": code,
            "message": message,
        }
        return Response(res)
        
@api_view(['PUT', 'DELETE'])
def place_review_update_or_delete(request, place_id, review_id):
    review = get_object_or_404(Review, pk = review_id)
    
    def review_update():
        if request.user == review.user:
            serializer = ReviewCreateSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                code = 200
                message = "리뷰 수정"
                res = {
                    "code": code,
                    "message": message,
                }
            return Response(res)

    def review_delete():
        if request.user == review.user:
            review.delete()
            code = 200
            message = "리뷰 삭제"
            res = {
                "code": code,
                "message": message,
            }
            return Response(res)
    
    if request.method == 'PUT':
        return review_update()
    
    elif request.method == 'DELETE':
        return review_delete()

