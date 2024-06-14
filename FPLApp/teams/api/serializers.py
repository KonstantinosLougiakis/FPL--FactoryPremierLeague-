from rest_framework import serializers
from teams.models import Team, Player

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        exclude = ('team',)

class TeamSerializer(serializers.ModelSerializer):

    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = '__all__'