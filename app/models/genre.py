from datetime import datetime
from .db import db, environment, SCHEMA

class Genre(db.Model):
    __tablename__ = 'genre'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    genre = db.Column(db.String(40), nullable=False, unique=True)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    user = db.relationship("User", backref='book')
    posts = db.relationship("Post", backref='book')
    favBooks = db.relationship('FavBook', backref='book', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'genre': self.genre,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
