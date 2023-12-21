# from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from watchlist_app.models import WatchList, StreamPlatform, Review
from .serializers import WatchListSerializer, StreamPlatformSerializer, ReviewSerializer
from rest_framework import status, generics, mixins, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

class StreamPlatform(viewsets.ReadOnlyModelViewSet):
    queryset = StreamPlatform.objects.all()
    serializer_class = StreamPlatformSerializer

    
# class StreamPlatformAV(APIView):
#     def get(self, request):
#         platforms = StreamPlatform.objects.all()
#         serializer = StreamPlatformSerializer(platforms, many=True, context={'request': request})
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = StreamPlatformSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WatchListAV(APIView):
    def get(self, request):
        movies = WatchList.objects.all()
        serializer = WatchListSerializer(movies, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = WatchListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

class WatchDetailAV(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            movie = WatchList.objects.get(pk=pk)
            serializer = WatchListSerializer(movie)
            return Response(serializer.data)
        except WatchList.DoesNotExist:
            return Response({"Error": "Movie doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, pk):
        movie = WatchList.objects.get(pk=pk)
        serializer = WatchListSerializer(instance=movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)       
    def delete(self, request, pk):
        movie = WatchList.objects.get(pk=pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class StreamPlatformDetailAV(APIView):
    def get(self, request, pk):
        try:
            movie = StreamPlatform.objects.get(pk=pk)
            serializer = StreamPlatformSerializer(movie, context={'request': request})
            return Response(serializer.data)
        except WatchList.DoesNotExist:
            return Response({"Error": "Platform doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    def put(self, request, pk):
        platform = StreamPlatform.objects.get(pk=pk)
        serializer = StreamPlatformSerializer(instance=platform, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)       
    def delete(self, request, pk):
        movie = StreamPlatform.objects.get(pk=pk)
        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
class ReviewList(generics.ListAPIView):
    # queryset = Review.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = ReviewSerializer
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Review.objects.filter(watchlist=pk)
class ReviewCreate(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    def perform_create(self, serializer):
        pk = self.kwargs['pk']
        movie = WatchList.objects.get(pk=pk)
        review_user = self.request.user
        if Review.objects.filter(watchlist=movie, review_user=review_user).exists():
            raise ValidationError("Already Reviwed")
        
        serializer.save(watchlist=movie)

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
# class ReviewList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)
#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
# class ReviewDetail(mixins.RetrieveModelMixin, generics.GenericAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
# @api_view(['GET', 'POST'])
# def movie_list(request):
#     if request.method == 'GET':
#         movies = Movie.objects.all()
#         serializer = WatchListSerializer(movies, many=True)
#         return Response(serializer.data)
#     if request.method == 'POST':
#         serializer = WatchListSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
# @api_view(['GET', 'PUT', 'DELETE'])
# def movie_detail(request, pk):
#     try:
#         movie = Movie.objects.get(pk=pk)
#     except Movie.DoesNotExist:
#         return Response({"Error': 'Movie doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = WatchListSerializer(movie)
#         return Response(serializer.data)
#     if request.method == 'PUT':
#         serializer = WatchListSerializer(instance=movie, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)
#     if request.method == 'DELETE':
#         if movie:
#             movie.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
