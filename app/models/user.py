from datetime import datetime
from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .friend import friends


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=True)
    last_name = db.Column(db.String(40), nullable=True)
    address = db.Column(db.String(60), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    picture = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.now(), nullable=False)

    friends = db.relationship(
        'User', secondary=friends,
        primaryjoin=id == friends.c.user_id,
        secondaryjoin=id == friends.c.friend_id,
        backref=db.backref('friends_backref', lazy='dynamic'),
        lazy='dynamic'
    )
    ups = db.relationship('Up', backref='user', lazy=True)
    favBooks = db.relationship('FavBook', backref='user', lazy=True)
    # comments = db.relationship('Comment', backref='user', lazy=True)
    posts = db.relationship('Post', backref='user', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'address': self.address,
            'username': self.username,
            'email': self.email,
            'picture': self.picture,
            'friends': [{'friend_id': friend.id} for friend in self.friends],
            'favBooks': [{'book_id': book.book_id} for book in self.favBooks],
            # 'comments': [{'id': comment.id, 'score': comment.score} for comment in self.comments],
            'posts': [{'id': post.id, 'score': post.score} for post in self.posts],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    # add and remove friends functions

    def add_friend(self, friend):
        if not self.is_friends_with(friend):
            self.friends.append(friend)
            db.session.commit()

    def remove_friend(self, friend):
        if self.is_friends_with(friend):
            self.friends.remove(friend)
            db.session.commit()

    def is_friends_with(self, friend):
        return self.friends.filter(friends.c.friend_id == friend.id).count() > 0
