from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin']
    def get_isAdmin(self, obj):
        return obj.is_staff
    def get__id(self, obj):
        return obj.id

# class UserSerializerWithToken(UserSerializer):
#     # token = serializers.SerializerMethodField(read_only=True)
#     class Meta:
#         model = User
#         # fields = ['id', 'name', 'username', 'email', 'isAdmin']
#     # def get_token(self, obj):
#     #     token = RefreshToken.for_user(obj)
#     #     return str(token.access_token)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
