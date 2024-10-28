from flask import Blueprint, request
from app import db
from app.models import Book, FavBook
from app.forms import CreateBookForm
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

#Create new book, then redirect to new book
@book_route.route('/new', methods=['POST'])
@login_required
def create_book():
    userId = current_user.id
    form = CreateBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        book = Book(
            user_id = userId,
            title = form.data['title'],
            author = form.data['author'],
            amazon = 'url',
            description = form.data['description'],
            genre_id = form.data['genre_id'],
            cover = form.data['cover']
        )

        db.session.add(book)
        db.session.commit()
        new_book = book.to_dict()

        return {'book': new_book}, 201
    return {'errors': form.errors}, 400

@book_route.route('/<int:book_id>', methods=['PUT'])
@login_required
def editBook(book_id):

    user = current_user.to_dict()

    book = db.session.query(Book).filter(Book.id == book_id).first()

    if not book:
        return {'errors': {'message': 'Book does not exist'}}, 404

    if book.user_id != user['id']:
        return {'errors': {'message': 'Unauthorized to edit this book'}}, 403

    form = CreateBookForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data.get('title'):
            book.title = form.data['title']
        if form.data.get('author'):
            book.author = form.data['author']
        if form.data.get('description'):
            book.description = form.data['description']
        if form.data.get('amazon'):
            book.amazon = form.data['amazon']
        if form.data.get('genre_id'):
            book.genre_id = form.data['genre_id']

        db.session.commit()

        updated_book = book.to_dict()

        return {'book': updated_book}, 200

    return form.errors, 400

@book_route.route('/<int:book_id>', methods=['DELETE'])
@login_required
def deleteBook(book_id):

    user = current_user.to_dict()
    book = db.session.query(Book).filter(Book.id == book_id).first()

    if not book:
        return {'error': 'Book not found'}, 404

    if book.user_id == user['id']:
        db.session.delete(book)
        db.session.commit()
        return {'message': 'Book deleted successfully'}, 200

    return {'error': 'Unauthorized to delete this book.'}, 401
