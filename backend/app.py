import time 
import json
from datetime import datetime, timedelta, timezone
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager



api = Flask(__name__)


api.config['JWT_SECRET_KEY'] = 'secret-goes-here'
# Set lifespan of tokens
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(api)


# Update token near end of life to keep user sessions.
@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response



@api.route('/token', methods=['post'])
def create_token():
    print (request.json)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email != 'test' or password != 'test':
        return {'msg': 'wrong email or password'}
    
    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response




@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response



    
@api.route('/profile')
@jwt_required() 
def my_profile():
    response_body = {
        'name': 'Brandon Nadeau',
        'about': 'Full Stack Trainee.'
    }
    return response_body





@api.route('/time')
def get_current_time():
    return {'time': time.time()}








