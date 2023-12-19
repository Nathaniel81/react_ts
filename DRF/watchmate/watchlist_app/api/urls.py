from django.urls import path
from watchlist_app.api import views

urlpatterns = [
    path('',  views.MovieListAV.as_view(), name='list'),
    path('<str:pk>/', views.MovieDetailAV.as_view(), name='detail'),
    path('stream/', views.StreamPlatformAV.as_view(), name='stream')
]
