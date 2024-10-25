from flask import Blueprint, request
from app import db
from app.models import Book, Comment, Post, User, FavBook
from flask_login import current_user, login_required

book_route = Blueprint('books', __name__)

# Get all books
@book_route.route('/')
def get_all_books():
    books = db.session.query(Book).all()
    book_list = [book.to_dict() for book in books]
    return {'Books': book_list}, 200

#Get book by ID, get all posts AND comments
@book_route.route('/<int:book_id>')
def get_book_by_id(book_id):
    book = db.session.query(Book).filter(Book.id == book_id).first()
    posts = db.session.query(Post).filter(Post.book_id == book_id)

    book_dict = book.to_dict()

    posts_list = {} #create list of posts for the book
    for post in posts:
        post_dict = post.to_dict()

        op_user = db.session.query(User).filter(User.id == post.user_id).first()
        comments = db.session.query(Comment).filter(Comment.post_id == post.id)

        comments_list = {} #create list of comments for the post
        for comment in comments:
            comments_list[comment.id] = (comment.to_dict())

        post_dict['comments'] = comments_list
        post_dict['op_user'] = op_user.to_dict()
        posts_list[post.id] = (post_dict)

    book_dict['posts'] = posts_list

    return {'Book': book_dict}, 200
