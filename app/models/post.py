from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .up import Up

class Post(db.Model):
    __tablename__ = 'posts'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id'), ondelete="CASCADE"), nullable=False)
    text = db.Column(db.Text, nullable=False)
    score = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    ups = db.relationship('Up', backref='post', lazy=True)
    comments = db.relationship('Comment', backref='post', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'text' : self.text,
            'score': self.score,
            'ups': [{
                'user_id': up.user_id,
                'value': up.value
            } for up in self.ups],
            'comments': [{
                'id': comment.id
            } for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
