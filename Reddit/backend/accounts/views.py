from rest_framework import generics
# from django.shortcuts import get_object_or_404
from accounts.serializers import MyTokenObtainPairSerializer, UserSerializer
# ( , RegistrationSerializer, UserSerializerWithToken)
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User
from django.core.exceptions import ValidationError



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


from django.core.exceptions import ValidationError
# from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

class UpdateUsernameView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        print(request.data)
        username = request.data.get('username')
        if not username:
            return Response('Invalid username', status=400)

        # check if username is taken
        if User.objects.filter(username=username).exists():
            return Response('Username is taken', status=409)

        # update username
        user = request.user
        user.username = username
        try:
            user.full_clean()
            user.save()
            return Response('OK')
        except ValidationError as e:
            return Response(str(e), status=400)
