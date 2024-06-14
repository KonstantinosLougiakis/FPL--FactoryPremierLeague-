from rest_framework import generics
from rest_framework import mixins
from teams.models import Team, Player
from teams.api.serializers import TeamSerializer, PlayerSerializer
from rest_framework.generics import get_object_or_404
from rest_framework import permissions
from teams.api.permissions import IsAdminOrReadOnly, IsAdminOrReadOnlyForCreate

class TeamListCreateAPIView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAdminOrReadOnly]

class TeamDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerCreateAPIView(generics.CreateAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        team_pk = self.kwargs.get("team_pk")
        team = get_object_or_404(Team, pk=team_pk)
        serializer.save(team=team)

class PlayerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class PlayerListCreateAPIView(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAdminOrReadOnlyForCreate]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)