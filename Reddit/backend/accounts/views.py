# from rest_framework import generics
# from django.shortcuts import get_object_or_404
from accounts.serializers import MyTokenObtainPairSerializer
# ( UserSerializer, RegistrationSerializer, UserSerializerWithToken)
# from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

