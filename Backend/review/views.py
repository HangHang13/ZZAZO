from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from place.models import Place
from .serializers.review import ReviewCreateSerializer, ReviewViewSerializer
from .models import Review
from place.serializers.place import PlaceTest2Serializer

@api_view(['POST'])
def place_review_create(request, place_id):
    place = Place.objects.using('place').get(_id = place_id)
    print(place.pk)
    print(place)
    print(request.data)
    print(request.user)
    print(type(request.user))

    serializer = ReviewCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, place=place)
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

