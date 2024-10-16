from app.models import db, Up, environment, SCHEMA
from sqlalchemy.sql import text

def seed_ups():

    for book_id in range(40): #40 books
        if book_id % 2 < 1:
            for user_id in range(1, 3):
                up = Up(value = 1, user_id = user_id, post_id = None, comment_id = None, book_id = book_id)
                db.session.add(up)
        else:
            for user_id in range(4, 12):
                up = Up(value = 1, user_id = user_id, post_id = None, comment_id = None, book_id = book_id)
                db.session.add(up)
    db.session.commit()


def undo_ups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ups"))

    db.session.commit()
