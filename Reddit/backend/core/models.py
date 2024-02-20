from django.db import models
from accounts.models import User

class Subreddit(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=500)
    subscribers = models.ManyToManyField(User, related_name='subscriptions')
    moderators = models.ManyToManyField(User, related_name='moderates')
    rules = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    subreddit = models.ForeignKey(Subreddit, on_delete=models.CASCADE)
    upvotes = models.ManyToManyField(User, blank=True, related_name='upvoted_posts')
    downvotes = models.ManyToManyField(User, blank=True, related_name='downvoted_posts')

    def __str__(self):
        return self.title

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey("Comment", null=True, blank=True, on_delete=models.CASCADE)
    upvotes = models.ManyToManyField(User, blank=True, related_name='upvoted_comments')
    downvotes = models.ManyToManyField(User, blank=True, related_name='downvoted_comments')

    def __str__(self):
        return f"{self.author}'s comment on \"{self.parent_post}\""

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"From: {self.sender}, To: {self.receiver}, Content: {self.content}"
