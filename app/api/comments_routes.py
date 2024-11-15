from flask import Blueprint, request
from app import db
from app.models import Comment, User, Up
from app.forms import CommentForm
from flask_login import current_user, login_required

comment_route = Blueprint('comments', __name__)

#Get comments by post id
@comment_route.route('/<int:post_id>')
def get_comments(post_id):
    comments = db.session.query(Comment).filter(Comment.post_id == post_id)
    comments_list = [] #create list of comments for the post
    for comment in comments:
         user = db.session.query(User).filter(User.id == comment.user_id).first()
         comment_dict = comment.to_dict()
         comment_dict['user'] = user.to_dict()
         comments_list.append(comment_dict)
    return {'comments': comments_list}, 200

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

#add up, or change up if already exists
@comment_route.route('/<int:comment_id>/up/<int:value>', methods=['Post'])
@login_required
def add_comment_up(comment_id, value):
    #check to see if 'up' entry already exists
    up = db.session.query(Up).filter(Up.comment_id == comment_id, Up.user_id == current_user.id).first()

    posOrNeg = 0

    if value == 0:
        posOrNeg = -1
    if value == 1:
        posOrNeg = 1


    if up:
        up.value = posOrNeg

    else :
        new_up = Up(
            value = posOrNeg,
            user_id = current_user.id,
            comment_id = comment_id
        )
        db.session.add(new_up)

    db.session.commit()

    #return entire comment to update state
    comment = db.session.query(Comment).filter(Comment.id == comment_id).first()
    return {'message': 'Successfully voted', 'comment': comment.to_dict()}, 201


#delete up
@comment_route.route('/<int:comment_id>/up/delete', methods = ['DELETE'])
@login_required
def delete_comment_up(comment_id):
    up = db.session.query(Up).filter(Up.comment_id == comment_id, Up.user_id == current_user.id).first()

    if not up:
        return {'error': 'up entry was not found'}, 404

    db.session.delete(up)
    db.session.commit()

    #return entire comment to update state
    comment = db.session.query(Comment).filter(Comment.id == comment_id).first()
    return {'message': 'up was successfully deleted', 'comment': comment.to_dict()}, 200

#delete comment
@comment_route.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    user = current_user.to_dict()
    comment = db.session.query(Comment).filter(Comment.id == comment_id).first()

    if not comment:
        return {'error': 'Comment not found'}, 404

    if comment.user_id == user['id']: #checks if comment belongs to current user
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment deleted successfully'}, 200
    return {'error': 'Unauthorized to delete this comment'}, 401

#edit comment
@comment_route.route('/<int:comment_id>', methods=['PUT'])
@login_required
def editComment(comment_id):

    user = current_user.to_dict()

    comment = db.session.query(Comment).filter(Comment.id == comment_id).first()

    if not comment:
        return {'errors': {'message': 'Comment does not exist'}}, 404

    if comment.user_id != user['id']:
        return {'errors': {'message': 'Unauthorized to edit this comment'}}, 403

    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data.get('text'):
            comment.text = form.data['text']

        db.session.commit()

        updated_comment = comment.to_dict()

        return {'comment': updated_comment}, 200

    return form.errors, 400
