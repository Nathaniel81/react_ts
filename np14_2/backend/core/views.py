from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import exceptions


class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data

        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match!')

        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginAPIView(APIView):
    def post(self, request):
        data = request.data
        email = data['email']
        password = data['password']
        user = user.objects.filter(email=email).first()
        if user is None:
            raise exceptions.AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Incorrect Password!')

