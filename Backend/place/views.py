from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers.place import PlaceDetailSerializer
from .serializers.review import ReviewCreateSerializer

from place.models import Place, Review

@api_view(['GET'])
def place_detail(request, place_id):
    place = Place.objects.get(id=place_id)
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
    place = Place.objects.get(id = place_id)
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

    