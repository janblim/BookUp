from flask import Blueprint, request
from app import db
from app.models import User, friends
from flask_login import current_user, login_required

friend_route = Blueprint('friends', __name__)

#Get all friends of current user
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

#Get all friends of any user by id
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

#add friend route
@friend_route.route('/add/<int:friend_id>', methods=['POST'])
@login_required
def add_friend(friend_id):
    user_id = current_user.id

    if user_id == friend_id:
        return {'error': {'message': 'Cannot send a friend request to yourself'}}, 400

    user = User.query.get_or_404(user_id)
    friend = User.query.get_or_404(friend_id)

    existing_friendship = db.session.query(friends).filter(
        ((friends.c.user_id == user_id) & (friends.c.friend_id == friend_id)) |
        ((friends.c.user_id == friend_id) & (friends.c.friend_id == user_id))
    ).first()

    if existing_friendship:
        return {'message': 'Already friends'}, 400

    user.friends.append(friend)
    friend.friends.append(user)
    db.session.commit()
    return {'friend': friend.to_dict()}, 200

#delete friend route
@friend_route.route('/delete/<int:friend_id>', methods=['DELETE'])
def delete_friend(friend_id):
    user_id = current_user.id

    user = User.query.get_or_404(user_id)
    friend = User.query.get_or_404(friend_id)

    #Remove friendship for both users
    if friend in user.friends:
        user.friends.remove(friend)
        friend.friends.remove(user)
        db.session.commit()

        return ({'message': 'friend deleted'}), 200
    return ({'message': 'friendship not found'}), 404
