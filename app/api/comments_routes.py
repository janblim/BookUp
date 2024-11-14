from flask import Blueprint, request
from app import db
from app.models import Comment, User
from app.forms import CommentForm
from flask_login import current_user, login_required

comment_route = Blueprint('comments', __name__)

#Get comment by ID
@comment_route.route('/<int:comment_id>')
def get_comment_by_id(comment_id):
    comment = db.session.query(Comment).filter(Comment.id == comment_id).first()
    return {'Comment': comment.to_dict()}, 200

#Add Comment
@comment_route.route('/new/<int:post_id>', methods=['POST'])
@login_required
def create_comment(post_id):
    user_id = current_user.id
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment(
            text = form.data['text'],
            user_id = user_id,
            post_id = post_id,
            score = 0
        )

        db.session.add(comment)
        db.session.commit()
        new_comment = comment.to_dict()

        user = db.session.query(User).filter(User.id == user_id).first()
        new_comment['user'] = user.to_dict()

        return {'comment': new_comment}, 201
    return {'errors': form.errors}, 400
