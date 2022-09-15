from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers.place import PlaceDetailSerializer
from place.models import Place

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