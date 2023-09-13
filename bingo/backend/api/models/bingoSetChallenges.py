from ...extensions import db

bingo_set_challenges = db.Table('bingo_set_challenges',
    db.Column('challenge_id', db.Integer, db.ForeignKey('challenge.id', onupdate="CASCADE", ondelete="CASCADE")),
    db.Column('bingocard_id', db.Integer, db.ForeignKey('bingo_card.id', onupdate="CASCADE")),
    db.Column('position', db.Integer)
)