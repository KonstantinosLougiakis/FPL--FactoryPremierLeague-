from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Team(models.Model):
    name = models.CharField(max_length=50)
    year_founded = models.IntegerField(validators=[MinValueValidator(1850), MaxValueValidator(2023)])
    stadium = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    nickname = models.CharField(max_length=30)
    manager = models.CharField(max_length=30)
    championships = models.IntegerField()

    def __str__(self):
        return self.name
    
class Player(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    position = models.CharField(max_length=30)
    pref_foot = models.CharField(max_length=50)
    nationality = models.CharField(max_length=50)
    age = models.IntegerField(validators=[MinValueValidator(16), MaxValueValidator(40)])
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="players")

    def __str__(self):
        return self.firstname + " " + self.lastname