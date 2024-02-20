from . import views
from django.urls import path


urlpatterns = [
    path('subreddit', views.SubredditListCreateView.as_view(), name='list-subreddit'),
    path('subreddit/<str:name>', views.SubredditDetail.as_view(), name='subreddit-detail'),

    path('subreddit/<str:name>/subscribe/', views.SubscribeView.as_view(), name='subscribe'),
    path('subreddit/<str:name>/unsubscribe/', views.UnsubscribeView.as_view(), name='unsubcribe'),
]