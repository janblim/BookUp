from flask import Blueprint, request
from app import db
from app.models import Book, Comment, Post, User, FavBook
from flask_login import current_user, login_required

fav_route = Blueprint('favorites', __name__)

# Get all favorite books by user ID
@fav_route.route('/current')
@login_required
def get_user_favs():
    favorites = db.session.query(FavBook).filter(FavBook.user_id == current_user.id)

    book_list = []

    for favorite in favorites:
        book = db.session.query(Book).filter(Book.id == favorite.book_id).first()
        book_list.append(book.to_dict())

    return {'FavBooks': book_list}, 200
