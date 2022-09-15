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