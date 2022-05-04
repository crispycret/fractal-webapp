from flask import request
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.url import url_parse

from .. import db
from . import auth
from .models import User


@auth.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return {}

    
