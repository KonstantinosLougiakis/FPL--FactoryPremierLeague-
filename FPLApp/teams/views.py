from contextvars import Token
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

@api_view(['POST'])
def check_email(request):
    email = request.data.get('email')
    if User.objects.filter(email=email).exists():
        return Response({'isTaken': True}, status=status.HTTP_200_OK)
    return Response({'isTaken': False}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already taken'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(username, email, password)
    user.save()
    return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.filter(username=username).first()
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if not user.check_password(password):
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key}, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout(request):
    token = request.data.get('token')
    token.delete()
    return Response({'success': 'Logout successful'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def change_password(request):
    password = request.data.get('password')

    user = request.user
    user.set_password(password)
    user.save()
    return Response({'success': 'Password changed successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def change_email(request):
    email = request.data.get('email')

    user = request.user
    user.email = email
    user.save()
    return Response({'success': 'Email changed successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def change_username(request):
    username = request.data.get('username')

    user = request.user
    user.username = username
    user.save()
    return Response({'success': 'Username changed successfully'}, status=status.HTTP_200_OK)