from . import views
from django.urls import path


urlpatterns = [
    path('posts/', views.PostListView.as_view()),

    path('subreddit', views.SubredditListCreateView.as_view(), name='list-subreddit'),
    path('subreddit/<str:name>', views.SubredditDetail.as_view(), name='subreddit-detail'),

    path('subreddit/<str:name>/subscribe/', views.SubscribeView.as_view(), name='subscribe'),
    path('subreddit/<str:name>/unsubscribe/', views.UnsubscribeView.as_view(), name='unsubcribe'),

    path('link/', views.fetch_url_metadata),
    path('upload-image/', views.upload_image),
    path('upload-file/', views.upload_file),

    path('post-detail/<str:pk>/', views.post_detail),
    path('post-list/', views.CreatePost),
    path('subreddit/<str:subreddit_name>/posts/', views.SubredditPostsList.as_view()),
    path('subreddit/post/vote', views.VoteView.as_view()),

    path('post/<str:post_id>/comments/', views.TopCommentsView.as_view()),
    path('subreddit/post/comment/vote/', views.CommentVoteView.as_view()),
    path('subreddit/post/comment/', views.CreateComment.as_view()),
    path('search/', views.SearchView.as_view()),
]
