from .db import db, add_prefix_for_prod

# many-to-many table for friends, Flask doc recommends using Table rather than Model

friends = db.Table('friends',
                  db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
                  db.Column('friend_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
                  )
