from django.db import models
from accounts.models import User
from django_editorjs_fields import EditorJsJSONField


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
    title = models.CharField(max_length=100, null=True, blank=True)
    # content = EditorJsJSONField()
    content=EditorJsJSONField(
        plugins=[
            "@editorjs/image",
            "@editorjs/header",
            "editorjs-github-gist-plugin",
            "@editorjs/code@2.6.0",  # version allowed :)
            "@editorjs/list@latest",
            "@editorjs/inline-code",
            "@editorjs/table",
        ],
         tools={
                "Link":{
                    "config":{
                        "endpoint":
                            'api/link/'
                        }
                },
                "Image":{
                    "config":{
                        "endpoints":{
                            "byFile":'api/upload-file/',
                            "byUrl":'api/upload-image/'
                        },
                       
                    }
                },
                # "Attaches":{
                #     "config":{
                #         "endpoint":'/uploadf/'
                #     }
                # }
            }
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    subreddit = models.ForeignKey(Subreddit, related_name='posts', on_delete=models.CASCADE)
    # upvotes = models.ManyToManyField(User, blank=True, related_name='upvoted_posts')
    # downvotes = models.ManyToManyField(User, blank=True, related_name='downvoted_posts')

    # def __str__(self):
    #     return self.created_at

class VoteType(models.TextChoices):
    UP = 'UP', 'Upvote'
    DOWN = 'DOWN', 'Downvote'

class Vote(models.Model):
    user = models.ForeignKey(User, related_name='votes', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='votes', on_delete=models.CASCADE)
    type = models.CharField(max_length=4, choices=VoteType.choices)

    class Meta:
        unique_together = ('user', 'post')

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent_post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
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
