from rest_framework import generics, mixins, permissions, status
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from teams.models import Team, Player
from teams.api.serializers import TeamSerializer, PlayerSerializer
from teams.api.permissions import IsAdminOrReadOnly, IsAdminOrReadOnlyForCreate
from .serializers import UserLoginSerializer, UserRegistrationSerializer
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response

@csrf_exempt
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'success': True})

class CheckUsernameView(generics.GenericAPIView):
    """
    API view to check if a username is available.
    """

    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        username = request.query_params.get('username', None)
        if username:
            is_taken = User.objects.filter(username=username).exists()
            return Response({'available': not is_taken}, status=status.HTTP_200_OK)
        return Response({'error': 'Username parameter not provided'}, status=status.HTTP_400_BAD_REQUEST)

class UserRegistrationView(generics.CreateAPIView):
    """
    API view to handle user registration.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class UserListCreateAPIView(generics.ListCreateAPIView):
    """
    API view to list and create users.
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserLoginView(generics.CreateAPIView):
    """
    API view to handle user login.
    """
    serializer_class = UserLoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class TeamListCreateAPIView(generics.ListCreateAPIView):
    """
    API view to list and create teams.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAdminOrReadOnly]

class TeamDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, and delete a team.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerCreateAPIView(generics.CreateAPIView):
    """
    API view to create a player within a specific team.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        team_pk = self.kwargs.get("team_pk")
        team = get_object_or_404(Team, pk=team_pk)
        serializer.save(team=team)

class PlayerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, and delete a player.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class PlayerListCreateAPIView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    """
    API view to list and create players.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAdminOrReadOnlyForCreate]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
