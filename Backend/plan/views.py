from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Max
from .models import Card
from .serializers.plan import CardListSerializer, CardSerializer
from place.models import Place

# Create your views here.
@api_view(['GET'])
def list(request):
    # card_list = Card.objects.filter(user = request.user)
    card_list = get_list_or_404(Card)
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

@api_view(['GET'])
def listCardId(request, cardId):
    card = Card.objects.filter(cardId = cardId)
    print(card)
    serializer = CardListSerializer(card, many=True)
    data = {'card' : serializer.data}
    code = 200
    message = "해당 공유 일정 리스트"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res) 


@api_view(['POST'])
def plan_create(request):
    card_id = Card.objects.aggregate(cardId = Max('cardId'))
    cid = card_id.get('cardId')
    print(cid)
    if cid == None:
        cid = 1
    else:
        cid +=1
    for i in range(len(request.data)):
        # place = Place.objects.using('place').get(_id = request.data[i].get("place_id"))
        requestData = request.data[i]
        print(requestData)  
        requestData['cardId'] = cid
        serializer = CardSerializer(data=requestData)
        if serializer.is_valid(raise_exception=True):
            # serializer.save(user=request.user, place = place)
            serializer.save(user=request.user)
            code = 200
            message = "약속 생성"
            res = {
                "code": code,
                "message": message,
                "data" : { 'cardId' : cid}
                }
        else:
            code = 401
            message = "약속 생성 실패"
            res = {
                "code": code,
                "message": message,
                }
    return Response(res) 

@api_view(['GET', 'PUT', 'DELETE'])
def plan_detail_put_or_delete(request, card_id):
    card = Card.objects.get(pk = card_id)
    def plan_detail():
        cards = Card.objects.filter(cardId = card_id)
        serializer = CardSerializer(instance = cards, many = True)
        data = {'cards': serializer.data}
        code = 200
        message = "약속 조회"
        res = {
            "code": code,
            "message": message,
            "data": data
            }
        return Response(res)
    
    def plan_put():
        if card is None:
            return Response("invalid request", status =status.HTTP_400_BAD_REQUEST)
        else:
            update_serializer = CardSerializer(instance = card, data=request.data)
            if update_serializer.is_valid(raise_exception=True):
                if request.user.id == card.user_id:
                    update_serializer.save()
                    code = 200
                    message = "약속 수정"
                    res = {
                        "code": code,
                        "message": message,
                        }
                    return Response(res)
            else:
                code = 401
                message = "약속 수정 실패"
                res = {
                    "code": code,
                    "message": message,
                }
                return Response(res)

    def plan_delete():
        if card is None:
            return Response("invalid request", status =status.HTTP_400_BAD_REQUEST)
        else: 
            if request.user.id == card.user_id:
                card.delete()
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
                
    if request.method == 'PUT':
        return plan_put()
    elif request.method == 'DELETE':
        return plan_delete()
    elif request.method == 'GET':
        return plan_detail()