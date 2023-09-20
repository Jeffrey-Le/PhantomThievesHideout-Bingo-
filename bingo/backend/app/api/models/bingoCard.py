from ...extensions import db, ma

class BingoCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    seed = db.Column(db.Integer)
    bingosetchallenges = db.relationship('Challenge', secondary='bingo_set_challenges', backref='bingosetchallenges')

    def __init__(self, seed):
        self.seed = seed

class BingoSchema(ma.Schema):
    class Meta:
        fields=('id', 'seed')

bingo_schema = BingoSchema() # One Item
bingos_schema = BingoSchema(many=True) # All Items
