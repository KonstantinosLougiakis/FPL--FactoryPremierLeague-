from rest_framework import serializers
from teams.models import MyTeamPlayer, Team, Player, UserProfile, MyTeam, User
from django.contrib.auth.models import User

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        print(user)
        user.save()
        return user

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        exclude = ('team',)

class TeamSerializer(serializers.ModelSerializer):

    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = '__all__'

class MyTeamPlayerSerializer(serializers.ModelSerializer):
    player = PlayerSerializer()

    class Meta:
        model = MyTeamPlayer
        fields = ['player']

class MyTeamSerializer(serializers.ModelSerializer):
    players = MyTeamPlayerSerializer(many=True)

    class Meta:
        model = Team
        fields = ['user', 'players']

class UserProfileSerializer(serializers.ModelSerializer):

    favourite_team = TeamSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = ['favourite_team', 'my_team_players']

class CheckUsernameView(serializers.Serializer):

    username = serializers.CharField()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value
    
class FavouriteTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'