from django.urls import include, path
from teams.api.views import TeamListCreateAPIView, TeamDetailAPIView, PlayerCreateAPIView, PlayerDetailAPIView
from .views import UserListCreateAPIView, UserLoginView, UserRegistrationView, CheckUsernameView, UserProfileViewSet
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')

urlpatterns = [
    path("teams/", TeamListCreateAPIView.as_view(), name="team-list"),
    path("teams/<int:pk>/", TeamDetailAPIView.as_view(), name="team-detail"),
    path("teams/<int:team_pk>/player/", PlayerCreateAPIView.as_view(), name="team-player"),
    path("player/<int:pk>/", PlayerDetailAPIView.as_view(), name="player-detail"),
    path("register/", UserRegistrationView.as_view(), name="user-registration"),
    path("login/", UserLoginView.as_view(), name="user-login"),
    path("check-username/", CheckUsernameView.as_view(), name="check-username"),
    path("teams/user/", UserListCreateAPIView.as_view(), name="user-list"),
    path("my-teams/", UserListCreateAPIView.as_view(), name="my-team-list-create"),
    path("my-teams/<int:pk>/", UserListCreateAPIView.as_view(), name="my-team-detail"),
    path("user-profile/", UserListCreateAPIView.as_view(), name="user-profile"),
    # path('', include(router.urls)),
]
