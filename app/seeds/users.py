from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', address='California, USA', picture='url.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='McBride', address='Ohio, USA', picture='url.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Turner', address='Minnesota, USA', picture='url.jpg')
    paul = User(
        username='SpicyWormer65', email='paul@aa.io', password='password', first_name='Paul', last_name='Atredies', address='Caladaan', picture='url.jpg')
    leto = User(
        username='WormEmperor81', email='leto@aa.io', password='password', first_name='Leto II', last_name='Atredies', address='Arrakis', picture='url.jpg')
    luke = User(
        username='JediBoy77', email='luke@aa.io', password='password', first_name='Luke', last_name='Skywalker', address='Anchorhead, Tatooine', picture='url.jpg')
    han = User(
        username='ScruffyNerf80', email='han@aa.io', password='password', first_name='Han', last_name='Solo', address='Corellia', picture='url.jpg')
    leia = User(
        username='PrincessCinnabon83', email='leia@aa.io', password='password', first_name='Leia', last_name='Organa', address='Alderaan', picture='url.jpg')
    padme = User(
        username='QueenArmadillo99', email='padme@aa.io', password='password', first_name='Padme', last_name='Amidala', address='Naboo', picture='url.jpg')
    sheev = User(
        username='IamtheSenate05', email='sheev@aa.io', password='password', first_name='Sheev', last_name='Palpatine', address='Naboo', picture='url.jpg')
    yoda = User(
        username='FriendofWookies02', email='yoda@aa.io', password='password', first_name='Yoda', last_name='Green', address='Coruscant', picture='url.jpg')
    anakin = User(
        username='DarthVader01', email='anakin@aa.io', password='password', first_name='Anakin', last_name='Skywalker', address='Mos Espa, Tatooine', picture='url.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(paul)
    db.session.add(leto)
    db.session.add(luke)
    db.session.add(han)
    db.session.add(leia)
    db.session.add(padme)
    db.session.add(sheev)
    db.session.add(yoda)
    db.session.add(anakin)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
