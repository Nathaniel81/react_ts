from rest_framework import serializers
from .models import Subreddit, Post, Comment, Vote, VoteType
from accounts.serializers import UserSerializer
from django.db.models import Count, Q, F
from accounts.models import User


class SubredditSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    subscribers = UserSerializer(many=True, read_only=True)
    moderators = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Subreddit
        exclude = ('rules', 'description', ) 

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

class ParentCommentSerializer(serializers.ModelSerializer):
    comment_votes = VoteSerializer(many=True, read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
class CommentSerializer(serializers.ModelSerializer):
    comment_votes = VoteSerializer(many=True, read_only=True)
    net_votes = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)
    # parent_comment = ParentCommentSerializer()
    parent_comment = ParentCommentSerializer(read_only=True)
    parent_comment_id = serializers.PrimaryKeyRelatedField(
        source='parent_comment', queryset=Comment.objects.all(), 
        allow_null=True, required=False, write_only=True)
    # author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Comment
        # exclude = ('parent_post', ) 
        fields = '__all__'

    def get_net_votes(self, obj):
        upvotes = obj.comment_votes.filter(type=VoteType.UP).count()
        downvotes = obj.comment_votes.filter(type=VoteType.DOWN).count()
        return upvotes - downvotes
    # def create(self, validated_data):
    #     author_data = validated_data.pop('author')
    #     author = User.objects.get(id=author_data['id'])
    #     comment = Comment.objects.create(author=author, **validated_data)
    #     return comment


class PostSerializer(serializers.ModelSerializer):
    content = serializers.JSONField(read_only=True)
    author = UserSerializer(read_only=True)
    # comments = CommentSerializer(read_only=True, many=True)
    comments = serializers.SerializerMethodField()
    votes = VoteSerializer(many=True, read_only=True)
    subreddit = SubredditSerializer(read_only=True)
    post_net_votes = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'

    def get_comments(self, obj):
        comments = Comment.objects.filter(parent_post=obj).annotate(
            upvotes=Count('comment_votes', filter=Q(comment_votes__type=VoteType.UP)),
            downvotes=Count('comment_votes', filter=Q(comment_votes__type=VoteType.DOWN))
        ).annotate(net_votes=F('upvotes') - F('downvotes'))
        return CommentSerializer(comments.order_by('-net_votes', '-created_at'), many=True, read_only=True).data

    def get_post_net_votes(self, obj):
        upvotes = obj.votes.filter(type=VoteType.UP).count()
        downvotes = obj.votes.filter(type=VoteType.DOWN).count()
        return upvotes - downvotes


class SubredditSerializer_detailed(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    subscribers = UserSerializer(many=True, read_only=True)
    moderators = UserSerializer(many=True, read_only=True)
    members_count = serializers.SerializerMethodField()
    is_subscriber = serializers.SerializerMethodField()
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = Subreddit
        fields = '__all__'

    def get_members_count(self, obj):
        return obj.subscribers.count()

    def get_is_subscriber(self, obj):
        user = self.context['request'].user
        return obj.subscribers.filter(id=user.id).exists()
