from flask import Blueprint, request
from app import db
from app.models import Post, Comment, User, Up
from flask_login import current_user, login_required

post_route = Blueprint('posts', __name__)

#Get all posts by book ID. Also gets op info, for username and picture. Also gets comments.
@post_route.route('/<int:book_id>')
def get_posts_by_id(book_id):
    posts = db.session.query(Post).filter(Post.book_id == book_id)

    posts_list = []
    for post in posts:
        post_dict = post.to_dict()

        op_user = db.session.query(User).filter(User.id == post.user_id).first()
        comments = db.session.query(Comment).filter(Comment.post_id == post.id)

        comments_list = [] #create list of comments for the post
        for comment in comments:
            comments_list.append(comment.to_dict())

        post_dict['comments'] = comments_list
        post_dict['op_user'] = op_user.to_dict()
        posts_list.append(post_dict)


    return {'Posts': posts_list}, 200

@post_route.route('/<int:post_id>/up/<int:value>', methods=['Post'])
@login_required
def add_post_up(post_id, value):
    #check to see if 'up' entry already exists
    up = db.session.query(Up).filter(Up.post_id == post_id, Up.user_id == current_user.id).first()

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
            post_id = post_id
        )
        db.session.add(new_up)

    db.session.commit()

    #return entire post to update state
    post = db.session.query(Post).filter(Post.id == post_id).first()
    return {'message': 'Successfully voted', 'post': post.to_dict()}, 201



@post_route.route('/<int:post_id>/up/delete', methods = ['DELETE'])
@login_required
def delete_post_up(post_id):
    up = db.session.query(Up).filter(Up.post_id == post_id, Up.user_id == current_user.id).first()

    if not up:
        return {'error': 'up entry was not found'}, 404

    db.session.delete(up)
    db.session.commit()
    return {'message': 'up was successfully deleted'}, 200
