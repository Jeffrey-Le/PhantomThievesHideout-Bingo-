from .extensions import db, ma

bingo_set_challenges = db.Table('bingo_set_challenges',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('position', db.Integer),
    db.Column('bingocard_id', db.Integer, db.ForeignKey('bingo_card.id', onupdate="CASCADE", ondelete="CASCADE")),
    db.Column('challenge_id', db.Integer, db.ForeignKey('challenge.id'))
)

class BingoCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seed = db.Column(db.Integer)
    bingosetchallenges = db.relationship('Challenge', secondary='bingo_set_challenges', backref='bingosetchallenges')

    def __init__(self, seed):
        self.seed = seed

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    challenge = db.Column(db.String(255))
    category = db.Column(db.String(32))

    def __init__(self, challenge, category):
        self.challenge = challenge
        self.category = category


class BingoSchema(ma.Schema):
    class Meta:
        fields=('id', 'seed')

class ChallengeSchema(ma.Schema):
    class Meta:
        fields=('id', 'challenge', 'category')

bingo_schema = BingoSchema() # One Item
bingos_schema = BingoSchema(many=True) # All Items

challenge_schema = ChallengeSchema() # One Item
challenges_schema = ChallengeSchema(many=True) # All Items