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

    fav2 = FavBook(
        user_id = 1,
        book_id = 18
    )

    fav4 = FavBook(
        user_id = 1,
        book_id = 23
    )



    db.session.add(fav1)
    db.session.add(fav2)
    db.session.add(fav3)
    db.session.add(fav4)
    db.session.commit()

def undo_favBooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favBooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favBooks"))

    db.session.commit()
