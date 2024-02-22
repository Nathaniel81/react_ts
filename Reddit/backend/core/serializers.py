from rest_framework import serializers
from .models import Subreddit, Post
from accounts.serializers import UserSerializer

class SubredditSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    subscribers = UserSerializer(many=True, read_only=True)
    moderators = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Subreddit
        exclude = ('rules', 'description', ) 

class SubredditSerializer_detailed(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    subscribers = UserSerializer(many=True, read_only=True)
    moderators = UserSerializer(many=True, read_only=True)
    members_count = serializers.SerializerMethodField()
    is_subscriber = serializers.SerializerMethodField()


    class Meta:
        model = Subreddit
        fields = '__all__'

    def get_members_count(self, obj):
        return obj.subscribers.count()
    
    def get_is_subscriber(self, obj):
        user = self.context['request'].user
        return obj.subscribers.filter(id=user.id).exists()

class PostSerializer(serializers.ModelSerializer):
    content = serializers.JSONField(read_only=True)
    author = UserSerializer(read_only=True)
    subreddit = SubredditSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'