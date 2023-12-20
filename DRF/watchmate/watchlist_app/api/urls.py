from django.urls import path, include
from rest_framework.routers import DefaultRouter
from watchlist_app.api import views

router = DefaultRouter()
router.register('stream', views.StreamPlatformAV, basename='streamplatform')

urlpatterns = [
    path('list',  views.WatchListAV.as_view(), name='list'),
    path('<int:pk>/', views.WatchDetailAV.as_view(), name='movie-detail'),
    path('', include(router.urls)),
    # path('stream/', views.StreamPlatformAV.as_view(), name='stream'),
    # path('stream/<int:pk>/', views.StreamPlatformDetailAV.as_view(), name='streamplatform-detail'),
    
    path('stream/<int:pk>/review', views.ReviewList.as_view(), name='review-list'),
    path('stream/<int:pk>/review-create', views.ReviewCreate.as_view(), name='review-create'),
    path('stream/review/<int:pk>', views.ReviewDetail.as_view(), name='review-detail')
]
