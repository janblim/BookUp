from flask import Blueprint, request
from app import db
from app.models import Post, Comment, User
from flask_login import current_user, login_required

post_route = Blueprint('posts', __name__)

#Get all posts by book ID
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
