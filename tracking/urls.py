from django.urls import path
from .views import index, track_view

urlpatterns = [
    path("", index, name="index"),  # Default page
    path("track/", track_view, name="track"),  # Track page
]
