from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import exceptions
from .models import User
from .authentication import create_access_token, create_refresh_token

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
        user = User.objects.filter(email=email).first()
        if user is None:
            raise exceptions.AuthenticationFailed('User not found!')
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Incorrect Password!')
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        serializer = UserSerializer(user)
        response = Response()
        response.set_cookie(key='refresh_token', value=refresh_token, httponly=True)
        
        response.data = {
			'token': access_token
		}

        return response
