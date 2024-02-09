import jwt
from datetime import datetime, timedelta, timezone
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header, BaseAuthentication
from .models import User

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            id = decode_access_token(token)
            user = User.objects.get(id=id)
            return (user, None)

        raise exceptions.AuthenticationFailed('Unauthenticated')

def create_access_token(id):
    # expiration_time = datetime.datetime.now(tz=timezone.utc) + datetime.timedelta(seconds=40)
    expiration_time = datetime.now(tz=timezone.utc) + timedelta(seconds=60)

    issued_at = datetime.utcnow()
    return jwt.encode({
        'user_id': id,
        'exp': expiration_time,
        'iat': issued_at
    }, 'access_secret', algorithm='HS256')

def decode_access_token(token):
    try:
        payload = jwt.decode(token, 'access_secret', algorithms=['HS256'])
        return payload.get('user_id')
    # except jwt.ExpiredSignatureError:
    #     raise exceptions.AuthenticationFailed('Token has expired')
    # except jwt.InvalidTokenError:
    #     raise exceptions.AuthenticationFailed('Invalid token')
    except Exception as e:
        print('An error occurred:', str(e))
        raise exceptions.AuthenticationFailed('An error occurred while decoding the token')

def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, 'refresh_secret', algorithms=['HS256'])
        return payload.get('user_id')
    # except jwt.ExpiredSignatureError:
    #     raise exceptions.AuthenticationFailed('Token has expired')
    # except jwt.InvalidTokenError:
    #     raise exceptions.AuthenticationFailed('Invalid token')
    except Exception as e:
        print('An error occurred[Refresh]:', str(e))
        raise exceptions.AuthenticationFailed('An error occurred while decoding the token')


def create_refresh_token(id):
    # expiration_time = datetime.datetime.now(tz=timezone.utc) + datetime.timedelta(seconds=40)
    expiration_time = datetime.now(tz=timezone.utc) + timedelta(seconds=300)
    issued_at = datetime.utcnow()
    return jwt.encode({
        'user_id': id,
        'exp': expiration_time,
        'iat': issued_at
    }, 'refresh_secret', algorithm='HS256')
