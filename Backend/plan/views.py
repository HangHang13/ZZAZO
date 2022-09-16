from django.shortcuts import render

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Card
from .serializers.plan import CardSerializer


# Create your views here.
@api_view(['GET'])
def list(request):
    # card_list = Card.objects.filter(user = request.user)
    card_list = Card.objects.all()
    serializer = CardListSerializer(card_list, many=True)
    data = {'cards': serializer.data}
    code = 200
    message = "공유 일정 리스트"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)

@api_view(['POST'])
def plan_create(request):
    serializer = CardSerializer(data=request.data)
    print(request.data)
    if serializer.is_valid(raise_exception=True):
        # serializer.save(user=request.user)
        code = 200
        message = "약속 생성"
        res = {
            "code": code,
            "message": message,
        }
        return Response(res, status=status.HTTP_201_CREATED)
        
    else:
        code = 401
        message = "약속 생성 실패"
        res = {
            "code": code,
            "message": message,
            }
        return Response(res)