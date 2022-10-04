from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers.place import PlaceListSerializer, PlaceSerializer
from plan.serializers.plan import CardListSerializer
from review.serializers.review import ReviewDetailSerializer
from review.models import Review


from plan.models import Card
from place.models import Place
from django.db.models import Q
from haversine import haversine
from django.db import connection

@api_view(['GET'])
def home(request):
    place_list = Card.objects.raw(''' SELECT * FROM plan_card GROUP BY place_id ORDER BY count(place_id) desc
    ''')[:10]

    serializer = CardListSerializer(place_list, many=True)
    
    # Model.objects.raw() 실행은 ORM 요청이기 때문에 raw 쿼리 요청 시에도 pk를 요구하는 데
    # sql 문으로 pk 주지 못하니 connection을 이용 해 sql 문 실행
    
    #      ==================================================
    place_data = {}
    
    for i, val in enumerate(serializer.data):
        placeUrlData = Place.objects.filter(_id = val.get('place_id'))
        placeUrlSerializer = PlaceListSerializer(placeUrlData, many=True)
        place_data[i] = placeUrlSerializer.data
    # 성별 =====================================================

    female = dict(genderFemale(placeFemale))
    male = dict(genderMale(placeMale))
    for i in place_data:
        val = place_data[i][0].get("_id")
        if val is None:
            continue

        if female.get(val) != None:
            femalecnt = female.get(val)
        elif female.get(val)== None:
            femalecnt = 0
        if male.get(val) != None:
            malecnt = male.get(val)
        elif male.get(val) == None :
            malecnt = 0
        
        if malecnt == 0 & femalecnt == 0 :
            place_data[i][0]['popularGender'] = None
        elif femalecnt > malecnt:
            place_data[i][0]['popularGender'] = 'female'
        elif malecnt > femalecnt:
            place_data[i][0]['popularGender'] = 'male'
        elif malecnt == femalecnt:
            place_data[i][0]['popularGender'] = 'all'

    # 연령 ==================================================
    allPlace = {}
    for i in popularAge(placeAge):
        if i[0] in allPlace:
            allPlace[i[0]] = allPlace[i[0]] +" & " + i[1]
        else:
            allPlace[i[0]] = i[1]
    for i, val in enumerate(serializer.data):
        if val.get('place_id') == None:
            continue
        place_data[i][0]['popularAge'] = allPlace.get(val.get('place_id'))
            
    data = {'Place': place_data}
    code = 200
    message = "추천 목록"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)
    
    
@api_view(['POST'])
def place_recommend(request):
    longitude = float(request.data['longitude'])
    latitude  = float(request.data['latitude'])
    radius = request.data['radius'] if request.data['radius'] else 500
    position  = (latitude, longitude)
    condition = (
                # 1km 기준
                Q(latitude__range  = (latitude - 0.01 * (radius / 1000), latitude + 0.01 * (radius / 1000))) &
                Q(longitude__range = (longitude - 0.015 * (radius / 1000), longitude + 0.015 * (radius / 1000)))
            )
    place_list = (
                Place
                .objects
                .filter(condition)
            )
    near_place_list = [info for info in place_list
                                if haversine(position, (info.latitude, info.longitude)) <= 2 * (radius / 1000)]
    
    # 약속 장소로 등록한 사람이 많고 별점이 높은 곳
    near_place_list.sort(key= lambda x: len(Card.objects.filter(place_id = x._id)))
    

    
    serializer = PlaceListSerializer(near_place_list, many=True)
    # 성별 =====================================================
    female = dict(genderFemale(placeFemale))
    male = dict(genderMale(placeMale))
    for i, val in enumerate(serializer.data):
        if val.get('_id') == None:
            continue

        if female.get(val.get('_id')) != None:
            femalecnt = female.get(val.get('_id'))
        elif female.get(val.get('_id'))== None:
            femalecnt = 0
        if male.get(val.get('_id')) != None:
            malecnt = male.get(val.get('_id'))
        elif male.get(val.get('_id')) == None :
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
        if val.get('place_id') == None:
            continue
        serializer.data[i]['popularAge'] = allPlace.get(val.get('place_id'))
    #      ==================================================

    data = {'Place': serializer.data}
    code = 200
    message = "추천 목록"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)


@api_view(['POST'])
def place_list(request, firstCategory):
    longitude = float(request.data['longitude'])
    latitude  = float(request.data['latitude'])
    radius = request.data['radius'] if request.data['radius'] else 500
    position  = (latitude,longitude)
    condition = (
                # 1km 기준
                Q(latitude__range  = (latitude - 0.01 * (radius / 1000), latitude + 0.01 * (radius / 1000))) &
                Q(longitude__range = (longitude - 0.015 * (radius / 1000), longitude + 0.015 * (radius / 1000))) &
                Q(firstCategory__contains = firstCategory)
            )
    place_list = (
                Place
                .objects
                .filter(condition)
            )
    near_place_list = [info for info in place_list if haversine(position, (info.latitude, info.longitude)) <= 2 * (radius / 1000)]
    serializer = PlaceListSerializer(near_place_list, many=True)
    # 성별 =====================================================
    female = dict(genderFemale(placeFemale))
    male = dict(genderMale(placeMale))
    for i, val in enumerate(serializer.data):
        if val.get('_id') == None:
            continue

        if female.get(val.get('_id')) != None:
            femalecnt = female.get(val.get('_id'))
        elif female.get(val.get('_id'))== None:
            femalecnt = 0
        if male.get(val.get('_id')) != None:
            malecnt = male.get(val.get('_id'))
        elif male.get(val.get('_id')) == None :
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
        if val.get('_id') == None:
            continue
        serializer.data[i]['popularAge'] = allPlace.get(val.get('_id'))
    #      ==================================================
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
    place = Place.objects.get(_id = place_id)
    review = Review.objects.filter(place = place_id)
    serializer = PlaceSerializer(place)
    # 성별 =====================================================
    female = dict(genderFemale(placeFemale))
    male = dict(genderMale(placeMale))
    val = dict(serializer.data)
    if val.get('_id') == None:
        return
    if female.get(val.get('_id')) != None:
        femalecnt = female.get(val.get('_id'))
    elif female.get(val.get('_id'))== None:
        femalecnt = 0
    if male.get(val.get('_id')) != None:
        malecnt = male.get(val.get('_id'))
    elif male.get(val.get('_id')) == None :
        malecnt = 0
        
    if malecnt == 0 & femalecnt == 0 :
        val['popularGender'] = None
    elif femalecnt > malecnt:
        val['popularGender'] = 'female'
    elif malecnt > femalecnt:
        val['popularGender'] = 'male'
    elif malecnt == femalecnt:
        val['popularGender'] = 'all'
    # ======================================================


    # 연령 ==================================================
    allPlace = {}
    for i in popularAge(placeAge):
        if i[0] in allPlace:
            allPlace[i[0]] = allPlace[i[0]] +" & " + i[1]
        else:
            allPlace[i[0]] = i[1]
    if val.get('_id') is None:
        return
    else:
        val['popularAge'] = allPlace.get(val.get('_id'))
    #      ==================================================
    reviewSerializer = ReviewDetailSerializer(review, many=True)
    data = {
        'Place': val,
        'Review' : reviewSerializer.data,
        }
    code = 200
    message = "장소 상세보기 로드"
    res = {
        "code": code,
        "message": message,
        "data": data
    }
    return Response(res)

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

