from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_csrf_token(request):
    return Response({'success': True})

@api_view(['POST'])
def check_username(request):
    username = request.data.get('username')
    if User.objects.filter(username=username).exists():
        return Response({'isTaken': True}, status=status.HTTP_200_OK)
    return Response({'isTaken': False}, status=status.HTTP_200_OK)
