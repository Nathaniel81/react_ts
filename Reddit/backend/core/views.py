from django.shortcuts import get_object_or_404
from rest_framework import generics
from .models import Subreddit, Post
from .serializers import SubredditSerializer, SubredditSerializer_detailed, PostSerializer
# from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthenticatedOrReadOnly
from django.db import IntegrityError
# from django.core.cache import cache

from rest_framework import status
from rest_framework.response import Response
from rest_framework import serializers


class SubredditListCreateView(generics.ListCreateAPIView):
    queryset = Subreddit.objects.all().order_by('-created_at')
    permission_classes = [IsAuthenticatedOrReadOnly]

    # def list(self, request, *args, **kwargs):
    #     # Check if the serialized list is cached
    #     cached_data = cache.get('subreddit_list')
    #     if cached_data:
    #         return Response(cached_data)

    #     # If not cached, proceed with the regular queryset
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset, many=True)
    #     cache.set('subreddit_list', serializer.data, timeout=3600)  # Cache for 1 hour
    #     return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return SubredditSerializer_detailed
        if self.request.method == 'POST':
            return SubredditSerializer

    def perform_create(self, serializer):
        serializer.save(
            creator=self.request.user,
            subscribers=[self.request.user],
            moderators=[self.request.user]
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError as e:
            return Response({"message": 
            [{
                "title": "A subreddit with this name already exists.", 
                "detail": "Please choose a different subreddit name"
            }]}, status=status.HTTP_409_CONFLICT)
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class SubredditDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Subreddit.objects.all()
    lookup_field = 'name'
    # lookup_url_kwarg = 'r_name'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return SubredditSerializer_detailed
        return SubredditSerializer

    # def retrieve(self, request, *args, **kwargs):
    #     cache_key = f'subreddit_{kwargs["name"]}'
    #     subreddit_detail = cache.get(cache_key)

    #     if not subreddit_detail:
    #         subreddit = self.get_object()
    #         serializer = self.get_serializer(subreddit)
    #         subreddit_detail = serializer.data
    #         cache.set(cache_key, subreddit_detail)

    #     return Response(subreddit_detail)

class SubscribeView(generics.UpdateAPIView):#ASTK
    queryset = Subreddit.objects.all()
    lookup_field = 'name'

    def update(self, request, *args, **kwargs):
        subreddit = self.get_object()
        subreddit.subscribers.add(request.user)
        return Response({'message': 'subscribed successfully'}, status=status.HTTP_204_NO_CONTENT)

class UnsubscribeView(generics.UpdateAPIView):#ASTK
    queryset = Subreddit.objects.all()
    lookup_field = 'name'

    def update(self, request, *args, **kwargs):
        subreddit = self.get_object()
        subreddit.subscribers.remove(request.user)
        return Response({'message': 'unsubscribed successfully'} ,status=status.HTTP_204_NO_CONTENT)

from bs4 import BeautifulSoup
import requests
from rest_framework.decorators import api_view

# @api_view(['GET'])
# def fetch_url_metadata(request):
#     url = request.GET.get('url')

#     if not url:
#         return Response('Invalid URL', status=400)

#     response = requests.get(url)
#     soup = BeautifulSoup(response.text, 'html.parser')

#     title = soup.title.string if soup.title else ''
#     description_tag = soup.find('meta', attrs={'name': 'description'})
#     description = description_tag['content'] if description_tag else ''
#     image_tag = soup.find('meta', attrs={'property': 'og:image'})
#     image_url = image_tag['content'] if image_tag else ''

#     return Response({
#         'success': 1,
#         'meta': {
#             'title': title,
#             'description': description,
#             'image': {
#                 'url': image_url,
#             },
#         },
#     })

@api_view(['GET'])
def fetch_url_metadata(request):
    url = request.GET.get('url')

    if not url:
        return Response('Invalid URL', status=400)

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    title = soup.title.string if soup.title else ''
    description_tag = soup.find('meta', attrs={'name': 'description'})
    description = description_tag['content'] if description_tag else ''
    image_tag = soup.find('meta', attrs={'property': 'og:image'})
    image_url = image_tag['content'] if image_tag else ''

    return Response({
        'success': 1,
        'meta': {
            'title': title,
            'description': description,
            'image': {
                'url': image_url,
            },
        },
    })

# @api_view(['POST'])
# def upload_file(request):
#     uploaded_file = request.FILES['file']
#     filename = uploaded_file.name
#     file_url = f"/media/{filename}"
#     with open(f"./media/{filename}", 'wb+') as destination:
#         for chunk in uploaded_file.chunks():
#             destination.write(chunk)
#     return Response({
#         'success': 1,
#         'file': {
#             'url': file_url,
#         },
#     })
from django.core.files.storage import FileSystemStorage

@api_view(['POST'])
def upload_image(request):
    uploaded_file = request.FILES['image']
    fs = FileSystemStorage()
    filename = fs.save(uploaded_file.name, uploaded_file)
    file_url = fs.url(filename)
    return Response({
        'success': 1,
        'file': {
            'url': file_url,
        },
    })

@api_view(['POST'])
def upload_file(request):
    uploaded_file = request.FILES['file']
    fs = FileSystemStorage()
    filename = fs.save(uploaded_file.name, uploaded_file)
    file_url = fs.url(filename)
    file_size = fs.size(filename)
    return Response({
        'success': 1,
        'file': {
            'url': file_url,
            'name': uploaded_file.name,
            'size': file_size,
        },
    })

# @api_view(['POST'])
# def create_post(request):
#     content = request.data.get('content')
#     subreddit_id = request.data.get('subredditId')
#     user = request.user
#     title = request.data.get('title')

#     subreddit = Subreddit.objects.get(id=subreddit_id)

#     post = Post.objects.create(
#         title=title,
#         content=content,
#         subreddit=subreddit,
#         author=user
#     )
#     return Response({'id'})

#ASTK
@api_view(['POST'])
def CreatePost(request):
    content = request.data.get('content')
    subreddit_id = request.data.get('subredditId')
    user = request.user
    title = request.data.get('title')
    subreddit = Subreddit.objects.get(id=subreddit_id)
    post = Post.objects.create(
        title=title,
        content=content,
        subreddit=subreddit,
        author=user
    )
    return Response({'message': 'successfully created'} ,status=status.HTTP_204_NO_CONTENT)

class SubredditPostsList(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        subreddit_name = self.kwargs['subreddit_name']
        return Post.objects.filter(subreddit__name=subreddit_name).order_by('-created_at')


# @api_view(['GET', 'PUT', 'DELETE'])
# def post_detail(request, pk):
#     try:
#         post = Post.objects.get(pk=pk)
#     except Post.DoesNotExist:
#         return Response(status=404)

#     if request.method == 'GET':
#         serializer = PostSerializer(post)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = PostSerializer(post, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)

#     elif request.method == 'DELETE':
#         post.delete()
#         return Response(status=204)
