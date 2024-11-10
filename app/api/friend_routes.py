from flask import Blueprint, request
from app import db
from app.models import User
from flask_login import current_user, login_required

friend_route = Blueprint('friends', __name__)

#Get all friends of user
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

@friend_route.route('<int:user_id>')
def get_user_friends(user_id):
    user = User.query.get(user_id)
    user_dict = user.to_dict()
    friends = user_dict['friends']
    friends_list = []
    for friend in friends:
        friend = db.session.query(User).filter(User.id == friend['friend_id']).first()
        friends_list.append(friend.to_dict())
    return {'friends': friends_list}, 200
