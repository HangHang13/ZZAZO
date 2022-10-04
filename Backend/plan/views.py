from django.shortcuts import render
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Max
from .models import Card
from .serializers.plan import CardListSerializer, CardSerializer
from place.models import Place
from place.serializers.place import PlaceListSerializer
from django.db import connection

def success_res(code, message, data=None):
    if data != None:
        res = {"code": code, "message": message, "data" : data}
        return res
    else:
        res = {"code": code, "message": message}
        return res

# Create your views here.
@api_view(['GET'])
def list(request):
    card_list = Card.objects.filter(user = request.user)
    serializer = CardListSerializer(card_list, many=True)
    res = success_res(200, "공유 일정 리스트", {'cards': serializer.data})
    return Response(res)

@api_view(['GET'])
def listCardId(request, cardId):
    card = Card.objects.filter(cardId = cardId)
    serializer = CardListSerializer(card, many=True)   

    # 성별 =====================================================
    female = dict(genderFemale(placeFemale))
    male = dict(genderMale(placeMale))

    for i, val in enumerate(serializer.data):
        place_id_data = val.get("place_id")
        if place_id_data is None:
            continue

        if female.get(place_id_data) != None:
            femalecnt = female.get(place_id_data)
        elif female.get(place_id_data)== None:
            femalecnt = 0
        if male.get(place_id_data) != None:
            malecnt = male.get(place_id_data)
        elif male.get(val) == None :
            malecnt = 0
        if malecnt == 0 & femalecnt == 0 :
            serializer.data[i]['popularGender'] = None
        elif femalecnt > malecnt:
            serializer.data[i]['popularGender'] = 'female'
        elif malecnt > femalecnt:
            serializer.data[i]['popularGender'] = 'male'
        elif malecnt == femalecnt:
            serializer.data[i]['popularGender'] = 'all'
    

    # 연령 ==================================================
    allPlace = {}
    for i in popularAge(placeAge):
        if i[0] in allPlace:
            allPlace[i[0]] = allPlace[i[0]] +" & " + i[1]
        else:
            allPlace[i[0]] = i[1]
    for i, val in enumerate(serializer.data):
        if val.get('place_id') is None:
            continue
        else:
            serializer.data[i]['popularAge'] = allPlace.get(val.get('place_id'))

    res = success_res(200, "해당 공유 일정 리스트", {'card' : serializer.data})
    return Response(res) 


@api_view(['POST'])
def plan_create(request):
    card_id = Card.objects.aggregate(cardId = Max('cardId'))
    cid = card_id.get('cardId')
    print(cid)
    if cid is None:
        cid = 1
    else:
        cid +=1
    for i in range(len(request.data)):
        # place = Place.objects.using('place').get(_id = request.data[i].get("place_id"))
        requestData = request.data[i]
        requestData['cardId'] = cid
        serializer = CardSerializer(data=requestData)
        if serializer.is_valid(raise_exception=True):
            # serializer.save(user=request.user, place = place)
            serializer.save(user=request.user)
            res = success_res(200, "약속 생성", {'cardId' : cid})  
        else:
            res = success_res(401, "약속 생성 실패")
            
    return Response(res) 

@api_view(['GET', 'PUT', 'DELETE'])
def plan_detail_put_or_delete(request, cardId):
    card = Card.objects.get(pk = cardId)
    def plan_detail():
        cards = Card.objects.filter(cardId = cardId)
        serializer = CardSerializer(instance = cards, many = True)        
        res = success_res(200, "약속 조회", {'cards': serializer.data})
        return Response(res)
    
    def plan_put():
        if card is None:
            return Response("invalid request", status =status.HTTP_400_BAD_REQUEST)
        else:
            update_serializer = CardSerializer(instance = card, data=request.data)
            if update_serializer.is_valid(raise_exception=True):
                if request.user.id == card.user_id:
                    update_serializer.save()
                    res = success_res(200, "약속 수정")
                    return Response(res)
            else:
                res = success_res(401, "약속 수정 실패")
                return Response(res)

    def plan_delete():
        if card is None:
            return Response("invalid request", status =status.HTTP_400_BAD_REQUEST)
        else: 
            if request.user.id == card.user_id:
                card.delete()
                res = success_res(200, "약속 삭제 성공")
                return Response(res)
            
            else:
                res = success_res(401, "약속 삭제 실패")
                return Response(res)
                
    if request.method == 'PUT':
        return plan_put()
    elif request.method == 'DELETE':
        return plan_delete()
    elif request.method == 'GET':
        return plan_detail()
def genderFemale(placeFemale):
    with connection.cursor() as cursor:
        cursor.execute(placeFemale)
        confemale = cursor.fetchall()
    return confemale
def genderMale(placeMale):
    with connection.cursor() as cursor:
        cursor.execute(placeMale)
        conmale = cursor.fetchall()
    return conmale
def popularAge(placeAge):
    with connection.cursor() as cursor:
        cursor.execute(placeAge)
        all_Place = cursor.fetchall()
    return all_Place

# 약속 카드 장소에 대한 남, 녀 작성 수
placeFemale = "SELECT pc.place_id, count(au.userGender) AS gender FROM plan_card AS pc join accounts_user AS au where au.userGender = 'F'  group BY place_id"
placeMale = "SELECT pc.place_id, count(au.userGender) AS gender FROM plan_card AS pc join accounts_user AS au where au.userGender = 'M'  group BY place_id"

# 약속 카드 장소에 대한 가장 많이 사용하는 연령 대
placeAge = "SELECT t1.place_id, t1.ageGroup FROM (SELECT g.place_id, g.ageGroup, g.total AS total  FROM (SELECT a.place_id, case when age >= 10 AND age<20 then'10대' when age >= 20 AND age < 30 then '20대' when age >= 30 AND age < 40 then '30대' when age >= 40 AND age < 50 then '40대' when age >= 50 AND age < 60 then '50대' when age >= 60 AND age < 70 then '60대' ELSE '만족없음'END AS ageGroup , COUNT(*) AS total FROM  (select pc.place_id, FLOOR((CAST(REPLACE(CURRENT_DATE,'-','') AS UNSIGNED) - CAST(REPLACE(au.userBirth,'-','') AS UNSIGNED)) / 10000 ) + 1 AS age FROM plan_card AS pc JOIN accounts_user AS au ON pc.user_id = au.id) AS a GROUP BY a.place_id, ageGroup) AS g GROUP BY g.place_id, g.ageGroup) AS t1, (SELECT g.place_id, max(g.total) AS max_total  FROM (SELECT a.place_id, case when age >= 10 AND age<20 then'10대' when age >= 20 AND age < 30 then '20대' when age >= 30 AND age < 40 then '30대' when age >= 40 AND age < 50 then '40대' when age >= 50 AND age < 60 then '50대' when age >= 60 AND age < 70 then '60대' ELSE '만족없음' END AS ageGroup , COUNT(*) AS total FROM (select pc.place_id, FLOOR((CAST(REPLACE(CURRENT_DATE,'-','') AS UNSIGNED) - CAST(REPLACE(au.userBirth,'-','') AS UNSIGNED)) / 10000 ) + 1 AS age FROM plan_card AS pc JOIN accounts_user AS au ON pc.user_id = au.id) AS a GROUP BY a.place_id, ageGroup) AS g GROUP BY g.place_id) AS t2 WHERE t1.total = t2.max_total AND t1.place_id = t2.place_id"

