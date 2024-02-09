import jwt
from datetime import datetime, timedelta

def create_access_token(id):
    exp_time = datetime.utcnow() + timedelta(seconds=30)
    issued_at = datetime.utcnow()
    return jwt.encode({
        'user_id': id,
        'exp': exp_time.isoformat(),
        'iat': issued_at.isoformat()
    }, 'access_secret', algorithm='HS256')

def create_refresh_token(id):
    exp_time = datetime.utcnow() + timedelta(seconds=30)
    issued_at = datetime.utcnow()
    return jwt.encode({
        'user_id': id,
        'exp': exp_time.isoformat(),
        'iat': issued_at.isoformat()
    }, 'refresh_secret', algorithm='HS256')
