from flask import Blueprint, request
from app import db
from app.models import Book
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
    return {'Book': book.to_dict()}, 200
