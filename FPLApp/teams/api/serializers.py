from rest_framework import serializers
from teams.models import Team, Player
from django.contrib.auth.models import User

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
            first_name=validated_data['firstname'],
            last_name=validated_data['lastname']
        )
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