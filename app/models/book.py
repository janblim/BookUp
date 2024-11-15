from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Book(db.Model):
    __tablename__ = 'books'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(255), nullable=False, unique=True)
    author = db.Column(db.String(50))
    amazon = db.Column(db.String(255))
    description = db.Column(db.Text)
    genre_id = db.Column(db.Integer, nullable=False)
    cover = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    user = db.relationship("User", backref='book')
    posts = db.relationship("Post", cascade='all,delete', backref='book')
    favBooks = db.relationship('FavBook', cascade='all,delete', backref='book', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'author': self.author,
            'amazon': self.amazon,
            'description': self.description,
            'genre_id': self.genre_id,
            'cover': self.cover,
            'fav_book_users': [{'user_id': favBook.user_id} for favBook in self.favBooks],
            'posts': [{'id': post.id} for post in self.posts],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
