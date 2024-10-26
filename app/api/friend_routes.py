from flask import Blueprint, request
from app import db
from app.models import User, Comment
from flask_login import current_user, login_required

friend_route = Blueprint('friends', __name__)

#Get all friends of user (broken)
@friend_route.route('/current')
@login_required
def get_friends():
    user = current_user.to_dict()
    friends = user['friends']
    friends_list = []
    for friend in friends:
        friend = db.session.query(User).filter(User.id == friend['friend_id']).first()
        friends_list.append(friend.to_dict())
    return {'friends': friends_list}, 200
