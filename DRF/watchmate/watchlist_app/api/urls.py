from django.urls import path
from watchlist_app.api import views

urlpatterns = [
    path('',  views.movie_list, name='list'),
    path('<str:pk>/', views.movie_detail, name='detail')
]
