from flask import Blueprint, request
from app import db
from app.models import Book, Comment, Post, User, FavBook
from flask_login import current_user, login_required

fav_route = Blueprint('favorites', __name__)

# Get all favorite books by user ID
@fav_route.route('/<int:user_id')
def get_user_fav(user_id):
    books = db.session.query(FavBook).filter(FavBook.user_id == user_id)
    book_list = [book.to_dict() for book in books]
    return {'FavBooks': book_list}, 200
