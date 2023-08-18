from ..extensions import db

bingo_set_challenges = db.Table('bingo_set_challenges',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('position', db.Integer),
    db.Column('bingocard_id', db.Integer, db.ForeignKey('bingo_card.id', ondelete="CASCADE")),
    db.Column('challenge_id', db.Integer, db.ForeignKey('challenge.id', onupdate="CASCADE", ondelete="CASCADE"))
)