from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Team, Player, User
# from .forms import CustomUserCreationForm, CustomUserChangeForm

admin.site.register(Team)
admin.site.register(Player)
admin.site.register(User)