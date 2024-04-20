from django.urls import re_path, path
from .views import index
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    re_path(r"^.*", index),
    path(
        "/sitemap.xml",
        serve,
        {"path": "sitemap.xml", "document_root": settings.STATIC_ROOT},
    ),
]
