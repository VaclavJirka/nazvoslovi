from django.contrib import admin
from .models import Group, Element, Compound

# Register your models here.
admin.site.register(Group)
admin.site.register(Element)
admin.site.register(Compound)