from app.models import db, Up, environment, SCHEMA
from sqlalchemy.sql import text

def seed_ups():

    for post_id in range(1, 4): #3 posts
        for user_id in range(4, 13):
            up = Up(value = 1, user_id = user_id, post_id = post_id, comment_id = None)
            db.session.add(up)

    # for comment_id in range(1, 16):
    #     for user_id in range(4, 13):
    #         up = Up(value = 1, user_id = user_id, post_id = None, comment_id = comment_id)
    #         db.session.add(up)

    db.session.commit()


def undo_ups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ups"))

    db.session.commit()
