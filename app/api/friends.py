from flask import Blueprint, request
from app import db
from app.models import Friend, Comment
from flask_login import current_user, login_required

friend_route = Blueprint('friends', __name__)

#Get friends of user (broken)
@friend_route.route('/<int:com_id>')
def get_friends(comment_id):
    comment = db.session.query(Comment).filter(comment.id == comment_id).first()
    return {'Comment': comment.to_dict()}, 200
