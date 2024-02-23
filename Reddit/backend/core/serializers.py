from rest_framework import serializers
from .models import Subreddit, Post, Comment
from accounts.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        exclude = ('parent_post', ) 

class SubredditSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    subscribers = UserSerializer(many=True, read_only=True)
    moderators = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Subreddit
        exclude = ('rules', 'description', ) 

class PostSerializer(serializers.ModelSerializer):
    content = serializers.JSONField(read_only=True)
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = '__all__'

class SubredditSerializer_detailed(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    subscribers = UserSerializer(many=True, read_only=True)
    moderators = UserSerializer(many=True, read_only=True)
    members_count = serializers.SerializerMethodField()
    is_subscriber = serializers.SerializerMethodField()
    # posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = Subreddit
        fields = '__all__'

    def get_members_count(self, obj):
        return obj.subscribers.count()

    def get_is_subscriber(self, obj):
        user = self.context['request'].user
        return obj.subscribers.filter(id=user.id).exists()