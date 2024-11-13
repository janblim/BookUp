from flask import Blueprint, request
from app import db
from app.models import Post, Comment, User, Up, Book
from app.forms import PostForm
from flask_login import current_user, login_required

post_route = Blueprint('posts', __name__)

#Get all posts by book ID. Also gets op info, for username and picture (for book page)
@post_route.route('/<int:book_id>')
def get_posts_by_id(book_id):
    posts = db.session.query(Post).filter(Post.book_id == book_id)

    posts_list = []
    for post in posts:
        post_dict = post.to_dict()

        op_user = db.session.query(User).filter(User.id == post.user_id).first()

        post_dict['op_user'] = op_user.to_dict()
        posts_list.append(post_dict)


    return {'Posts': posts_list}, 200

#get post with op info and comments (for post page)
@post_route.route('/post/<int:post_id>')
def get_post(post_id):
    post = db.session.query(Post).filter(Post.id == post_id).first()
    post_dict = post.to_dict()

    op_user = db.session.query(User).filter(User.id == post.user_id).first()
    book = db.session.query(Book).filter(Book.id == post.book_id).first()
    comments = db.session.query(Comment).filter(Comment.post_id == post.id)

    comments_list = [] #create list of comments for the post
    for comment in comments:
         user = db.session.query(User).filter(User.id == comment.user_id).first()
         comment_dict = comment.to_dict()
         comment_dict['user'] = user.to_dict()
         comments_list.append(comment_dict)

    post_dict['op_user'] = op_user.to_dict()
    post_dict['comments'] = comments_list
    post_dict['book'] = book.to_dict()

    return {'Post': post_dict}, 200

#add up, or change up if already exists
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


#delete up
@post_route.route('/<int:post_id>/up/delete', methods = ['DELETE'])
@login_required
def delete_post_up(post_id):
    up = db.session.query(Up).filter(Up.post_id == post_id, Up.user_id == current_user.id).first()

    if not up:
        return {'error': 'up entry was not found'}, 404

    db.session.delete(up)
    db.session.commit()

    #return entire post to update state
    post = db.session.query(Post).filter(Post.id == post_id).first()
    return {'message': 'up was successfully deleted', 'post': post.to_dict()}, 200

#add post
@post_route.route('/new/<int:book_id>', methods=['POST'])
@login_required
def create_post(book_id):
    user_id = current_user.id
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            title = form.data['title'],
            user_id = user_id,
            book_id = book_id,
            text = form.data['text'],
            score = 0
        )

        db.session.add(post)
        db.session.commit()
        new_post = post.to_dict()

        op_user = db.session.query(User).filter(User.id == user_id).first()
        new_post['op_user'] = op_user.to_dict()

        return {'post': new_post}, 201
    return {'errors': form.errors}, 400

#delete post
@post_route.route('/<int:post_id>', methods=['DELETE'])
@login_required
def deletePost(post_id):
    user = current_user.to_dict()
    post = db.session.query(Post).filter(Post.id == post_id).first()

    if not post:
        return {'error': 'Post not found'}, 404

    if post.user_id == user['id']: #checks if post belongs to current user
        db.session.delete(post)
        db.session.commit()
        return {'message': 'Post deleted successfully'}, 200
    return {'error': 'Unauthorized to delete this post'}, 401
