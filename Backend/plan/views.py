from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Card
from .serializers.plan import CardListSerializer, CardSerializer


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

@api_view(['PUT', 'DELETE'])
def plan_put_or_delete(request, cardId):
    def plan_put(request):
        cardId = get_object_or_404(Card, pk = cardId)
        if cardId is None:
            return Response("invalid request", status =status.HTTP_400_BAD_REQUEST)
        else:
            update_serializer = CardSerializer(cardId, data=request.data)
            if update_serializer.is_valid(raise_exception=True):
                code = 200
                message = "약속 수정"
                res = {
                    "code": code,
                    "message": message,
                    }
                return Response(res, status=status.HTTP_201_CREATED)
            else:
                code = 401
                message = "약속 수정 실패"
                res = {
                    "code": code,
                    "message": message,
                }
                return Response(res)

    def plan_delete(request):
        cardId = get_object_or_404(Card, pk = cardId)
        if cardId is None:
            return Response("invalid request", status =status.HTTP_400_BAD_REQUEST)
        else:
            drop_serializer = CardSerializer(cardId, data=request.data)
            if drop_serializer.is_valid(raise_exception=True):
                # drop_serializer.delete()
                code = 200
                message = "약속 삭제 성공"
                res = {
                    "code": code,
                    "message": message,
                    }
                return Response(res, status=status.HTTP_201_CREATED)
            else:
                code = 401
                message = "약속 삭제 실패"
                res = {
                    "code": code,
                    "message": message,
                    }
                return Response(res)
                
    if(request.method == 'PUT'):
        return plan_put()
    elif(request.method =='DELETE'):
        return plan_delete()