from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser, BaseUserManager

# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('The Email must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save()
#         return user
    
#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(email, password, **extra_fields)

# class CustomUser(AbstractUser):
#     ROLE_CHOICES = (
#         ('admin', 'Admin'),
#         ('user', 'User'),
#     )
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES)

#     objects = CustomUserManager()

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
    # price = models.DecimalField(max_digits=10, decimal_places=2)
    pref_foot = models.CharField(max_length=50)
    nationality = models.CharField(max_length=50)
    age = models.IntegerField(validators=[MinValueValidator(16), MaxValueValidator(40)])
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="players")

    def __str__(self):
        return self.firstname + " " + self.lastname
    
class User(models.Model):
    username = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=50)
    confirmPassword = models.CharField(max_length=50)

    def __str__(self):
        return self.username

class MyTeam(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="my_team")
    budget = models.DecimalField(max_digits=10, decimal_places=2)

class MyTeamPlayer(models.Model):
    my_team = models.ForeignKey(MyTeam, on_delete=models.CASCADE, related_name="players")
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    # price = models.DecimalField(max_digits=10, decimal_places=2)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    favorite_team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, blank=True, related_name="favourite_teams")
    my_team_players = models.ManyToManyField(Player, related_name="my_team_players")

    def __str__(self):
        return self.user.username
    
# class CustomUser(AbstractUser):
#     favourite_teams = models.ManyToManyField(Team, blank="True")

class FavouriteTeam(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favourite_teams")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="favourite_team")

    def __str__(self):
        return f"{self.user.username} - {self.team.name}"