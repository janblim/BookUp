from flask import Blueprint, request
from app import db
from app.models import Comment
from flask_login import current_user, login_required

comment_route = Blueprint('comments', __name__)

#Get comment by ID
@comment_route.route('/<int:comment_id>')
def get_comment_by_id(comment_id):
    comment = db.session.query(Comment).filter(Comment.id == comment_id).first()
    return {'Comment': comment.to_dict()}, 200
