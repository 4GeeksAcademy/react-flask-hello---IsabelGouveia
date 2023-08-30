"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)




@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify("Invalid credentials"), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token), 200

@api.route('/register', methods=['POST'])
def register_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    username = data.get("username")
    
    new_user = User(email=email, username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify("User registered successfully"), 200

