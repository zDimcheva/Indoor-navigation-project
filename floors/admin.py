from django.contrib import admin
from .models import Room
from .models import Event
from .models import Office

# Register your models here.
admin.site.register(Room)
admin.site.register(Event)
admin.site.register(Office)
