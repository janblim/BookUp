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

#Get book by ID
@book_route.route('/<int:book_id>')
def get_book_by_id(book_id):
    book = db.session.query(Book).filter(Book.id == book_id).first()
    book_dict = book.to_dict()
    return {'Book': book_dict}, 200

#Add to favorites by book ID

@book_route.route('/favorites/<int:book_id>', methods=['POST'])
@login_required
def add_book_favorite(book_id):
    check_fav = db.session.query(FavBook).filter(FavBook.book_id == book_id, FavBook.user_id == current_user.id).first()
    check_book = db.session.query(Book).filter(Book.id == book_id).first()

    if not check_book:
        return {'error': 'Book does not exist'}, 404

    if not check_fav:
        new_fav = FavBook(
            user_id = current_user.id,
            book_id = book_id
        )
        db.session.add(new_fav)
        db.session.commit()

        book = db.session.query(Book).filter(Book.id == new_fav.book_id).first()

        new_fav.to_dict()
        return {'message': 'Product added to favorites successfully', 'fav': book.to_dict()}, 201
    else:
        return {'error': 'Product is already added to favorites'}, 401
