import json, time

from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

from core import api




@api.route('/')
def index():
    return json.dumps({'msg': 'index'})



@api.route('/time')
def get_current_time():
    return {'time': time.time()}




@api.route('/token', methods=["POST"])
def create_token():
        
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    
    response = {"access_token":access_token}
    
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
        "name": "Brandon",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }
    return response_body







