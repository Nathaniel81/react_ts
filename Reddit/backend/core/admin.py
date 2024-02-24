from django.contrib import admin
from .models import Subreddit, Post, Comment, Vote, VoteType

admin.site.register(Subreddit)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Vote)
