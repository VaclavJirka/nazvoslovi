from django.urls import path
from .views import RequestCompoundsView  # TestCompoundsView

urlpatterns = [
    path("practice", RequestCompoundsView.as_view()),
    # path('test', TestCompoundsView.as_view()),
]
