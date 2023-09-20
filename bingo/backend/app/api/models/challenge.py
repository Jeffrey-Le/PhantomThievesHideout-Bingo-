from ...extensions import db, ma

import json

class Challenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    challenge = db.Column(db.String(255))
    category = db.Column(db.String(32))

    def __init__(self, challenge, category):
        self.challenge = challenge
        self.category = category

class ChallengeSchema(ma.Schema):
    class Meta:
        fields=('id', 'challenge', 'category')

challenge_schema = ChallengeSchema() # One Item
challenges_schema = ChallengeSchema(many=True) # All Items