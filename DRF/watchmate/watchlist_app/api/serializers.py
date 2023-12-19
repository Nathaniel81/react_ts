from rest_framework import serializers
from watchlist_app.models import WatchList, StreamPlatform, Review

def nameValidator(value):
    if len(value) < 2:
        raise serializers.ValidationError('Name is too short')
class WatchListSerializer(serializers.ModelSerializer):
    # len_name = serializers.SerializerMethodField()
    reviews = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = WatchList
        fields = '__all__'
        #exclude
    # def get_len_name(self, object):
    #     length = len(object.name)
    #     return length
    # def validate(self, data):
    #     if data['name'] == data['description']:
    #         raise serializers.ValidationError('Title & description should different')
    #     return data
    # def validate_name(self, value):
    #     if len(value) < 2:
    #         raise serializers.ValidationError('Name is too short')
    #     return value
    # id = serializers.IntegerField(read_only=True)
    # name = serializers.CharField(validators=[nameValidator])
    # description = serializers.CharField()
    # active = serializers.BooleanField()
    # def create(self, validated_data):
    #     return Movie.objects.create(**validated_data)
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.active = validated_data.get('active', instance.active)
    #     instance.save()
    #     return instance
class StreamPlatformSerializer(serializers.HyperlinkedModelSerializer):
    # watchlist = WatchListSerializer(many=True, read_only=True)
    watchlist = serializers.StringRelatedField(many=True, read_only=True)
    # watchlist = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name='movie-detail',
    # )
    class Meta:
        model = StreamPlatform
        fields = '__all__'
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
