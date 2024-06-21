from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Team, Player
# from .forms import CustomUserCreationForm, CustomUserChangeForm

admin.site.register(Team)
admin.site.register(Player)