from django.urls import path
from teams.api.views import TeamListCreateAPIView, TeamDetailAPIView, PlayerCreateAPIView, PlayerDetailAPIView

urlpatterns = [
    path("teams/", TeamListCreateAPIView.as_view(), name="team-list"),
    path("teams/<int:pk>/", TeamDetailAPIView.as_view(), name="team-detail"),
    path("teams/<int:team_pk>/player/", PlayerCreateAPIView.as_view(), name="team-player"),
    path("player/<int:pk>/", PlayerDetailAPIView.as_view(), name="player-detail"),
]