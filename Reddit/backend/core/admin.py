from django.contrib import admin
from .models import Subreddit, Post

admin.site.register(Subreddit)
admin.site.register(Post)
