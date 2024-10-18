from app.models import db, FavBook, environment, SCHEMA
from sqlalchemy.sql import text


def seed_favBooks():

    fav1 = FavBook(
        user_id = 1,
        book_id = 1
    )

    fav2 = FavBook(
        user_id = 1,
        book_id = 11
    )

    fav3 = FavBook(
        user_id = 1,
        book_id = 10
    )

    fav4 = FavBook(
        user_id = 1,
        book_id = 18
    )

    fav5 = FavBook(
        user_id = 1,
        book_id = 23
    )

    for book_id in range(1, 41): #40 books
        if book_id % 2 < 1:
            for user_id in range(3, 6):
                fav_book = FavBook(user_id = user_id,book_id = book_id)
                db.session.add(fav_book)
        else:
            for user_id in range(6, 13):
                fav_book = FavBook(user_id = user_id, book_id = book_id)
                db.session.add(fav_book)

    db.session.add(fav1)
    db.session.add(fav2)
    db.session.add(fav3)
    db.session.add(fav4)
    db.session.add(fav5)
    db.session.commit()

def undo_favBooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favBooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favBooks"))

    db.session.commit()
