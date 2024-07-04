from rest_framework import generics, mixins, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from teams.models import UserProfile
from .serializers import UserProfileSerializer
from teams.models import MyTeam, Team, Player
from teams.api.serializers import TeamSerializer, PlayerSerializer
from teams.api.permissions import IsAdminOrReadOnly, IsAdminOrReadOnlyForCreate
from .serializers import MyTeamSerializer, UserLoginSerializer, UserRegistrationSerializer
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserLoginSerializer

@csrf_exempt
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'success': True})

class CheckUsernameView(generics.GenericAPIView):
    """
    API view to check if a username is available.
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        username = request.query_params.get('username', None)
        if username:
            is_taken = User.objects.filter(username=username).exists()
            return Response({'available': not is_taken}, status=status.HTTP_200_OK)
        return Response({'error': 'Username parameter not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    # def get_serializer_class(self):
    #     return super().get_serializer_class()

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

class UserLoginView(generics.GenericAPIView):
    """
    API view to handle user login.
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print("Request data:", request.data)  # Debugging statement
        if not serializer.is_valid():
            print("Validation errors:", serializer.errors)  # Debugging statement
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        # Authenticate user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=user.username, password=password)
        
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
    # permission_classes = [permissions.AllowAny]

    # def get(self, request, *args, **kwargs):
    #     return self.retrieve(request, *args, **kwargs)

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

class MyTeamListCreateAPIView(generics.ListCreateAPIView):
    """
    API view to list and create my teams.
    """
    queryset = MyTeam.objects.all()
    serializer_class = MyTeamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

class MyTeamDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, and delete a my team.
    """
    queryset = MyTeam.objects.all()
    serializer_class = MyTeamSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserProfileViewSet(viewsets.ModelViewSet):
    """
    API view to retrieve, update, and delete a user profile.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def queryset(self):
        return UserProfile.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)