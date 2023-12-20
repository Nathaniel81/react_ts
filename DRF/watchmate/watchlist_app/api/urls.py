from django.urls import path
from watchlist_app.api import views

urlpatterns = [
    path('',  views.WatchListAV.as_view(), name='list'),
    path('<int:pk>/', views.WatchDetailAV.as_view(), name='movie-detail'),
    path('stream/', views.StreamPlatformAV.as_view(), name='stream'),
    path('stream/<int:pk>/', views.StreamPlatformDetailAV.as_view(), name='streamplatform-detail'),
    path('reviews', views.ReviewList.as_view(), name='review-list'),
    path('reviews/<int:pk>', views.ReviewDetail.as_view(), name='review-detail')
]
