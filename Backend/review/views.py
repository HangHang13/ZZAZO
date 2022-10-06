from django.db.models import Avg

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from place.models import Place
from .serializers.review import ReviewCreateSerializer, ReviewViewSerializer
from .models import Review
from place.serializers.place import PlaceSerializer



@api_view(['GET', 'POST'])

def place_review_create_or_create_form(request, place_id):
    place = Place.objects.using('place').get(_id = place_id)
    place_update = Place.objects.using('place').filter(_id = place_id)
    def review_create():
        serializer = ReviewCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, place=place)
            placeScore =  Review.objects.filter(place=place_id).aggregate(placeScore = Avg('score'))
            place_update.update(placeScore = round(placeScore['placeScore'],1))
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
    def review_create_form():
        placeSerializer = PlaceSerializer(place)
        placeScore =  Review.objects.filter(place=place_id).aggregate(placeScore = Avg('score'))
        placeData = (dict(placeSerializer.data))
        placeData.update(placeScore)
        if request.user.id != None:
            user_review = Review.objects.filter(user = request.user, place_id = place_id)
            if user_review:
                review_serializer = ReviewViewSerializer(user_review[0])
                code = 200
                message = "리뷰 작성 폼"
                data = {
                    "Place": placeData,
                    "reviews": review_serializer.data
                }
                res = {
                    "code": code,
                    "message": message,
                    "data": data
                }
                return Response(res)
            
            else:
                code = 200
                message = "리뷰 작성 폼"
                res = {
                    "code": code,
                    "message": message,
                    "data": {
                        "Place": placeData,
                        "reviews": []
                    }
                }
                return Response(res)
        else:
            code = 200
            message = "외부 사용자용 리뷰 작성 폼"
            data = {
                "Place": placeData,
                "reviews": []
            }
            res = {
                    "code": code,
                    "message": message,
                    "data": data
                }
            return Response(res)
        
            
    if request.method == 'POST':
        return review_create()
    
    elif request.method == 'GET':
        return review_create_form() 



@api_view(['PUT', 'DELETE'])
def place_review_update_or_delete(request, place_id, review_id):
    review = Review.objects.get(pk = review_id, place_id = place_id)
    place = Place.objects.using('place').get(_id = place_id)
    place_update = Place.objects.using('place').filter(_id = place_id)
    def review_update():
        if request.user.id == review.user_id:
            serializer = ReviewCreateSerializer(instance=review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user, place=place)
                placeScore =  Review.objects.filter(place=place_id).aggregate(placeScore = Avg('score'))
                place_update.update(placeScore = round(placeScore['placeScore'], 1))
                code = 200
                message = "리뷰 수정"
                res = {
                    "code": code,
                    "message": message,
                }
            return Response(res)

    def review_delete():
        if request.user.id == review.user_id:
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

