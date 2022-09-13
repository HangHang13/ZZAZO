from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Card
from .serializers.plan import CardListSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
def list(request):
    card_list = Card.objects.filter(user = request.user)
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

