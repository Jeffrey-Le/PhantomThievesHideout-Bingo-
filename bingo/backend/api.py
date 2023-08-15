from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from sqlalchemy.orm import relationship, load_only, lazyload
from sqlalchemy.sql import func, select, column
import os

#dotenv_path = Path('./.env')
load_dotenv()

app = Flask(__name__)
CORS(app)

SQLpass = os.getenv("SQLPASSWORD")

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://root:{SQLpass}@localhost/manhuntbingodb"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

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
    #bingo_set_challenges = db.relationship('BingoSetChallenges', backref='challenge')

    def __init__(self, challenge, category):
        self.challenge = challenge
        self.category = category

'''class BingoSetChallenge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    position = db.Column(db.Integer)
    card_id = db.Column(db.Integer, db.ForeignKey('bingocard.id'))
    challenge_id = db.Column(db.Integer, db.ForeignKey('challenge.id'))

    def __init__(self, position):
        self.position = position'''

class BingoSchema(ma.Schema):
    class Meta:
        fields=('id', 'seed')

class ChallengeSchema(ma.Schema):
    class Meta:
        fields=('id', 'challenge', 'category')

# Bingo Schema
bingo_schema = BingoSchema() # One Item
bingos_schema = BingoSchema(many=True) # All Items

# Challenge Schema
challenge_schema = ChallengeSchema() # One Item
challenges_schema = ChallengeSchema(many=True) # All Items

# Get All Bingo Cards Data
@app.route('/get', methods = ['GET'])
def getAllData():
    allBingoCards = BingoCard.query.all()
    results = bingos_schema.dump(allBingoCards)
    return jsonify(results)

# Get one bingo card data by id
@app.route('/get/<id>', methods = ['GET'])
def card_details(id):
    card = BingoCard.query.get(id)
    return bingo_schema.jsonify(card)

# Get All Challenges
@app.route('/get/challenge', methods = ['GET'])
def getAllChallenges():
    allChallenges = Challenge.query.all()
    results = challenges_schema.dump(allChallenges)
    return jsonify(results)

# Get All Challenges By Category
@app.route('/get/challenge/<challengeCategory>', methods = ['GET'])
def getChallengeByCategory(challengeCategory):
    print('Challenge Category: ', challengeCategory)
    allChallenges = Challenge.query.filter(Challenge.category == challengeCategory).all()
    print(allChallenges)
    results = challenges_schema.dump(allChallenges)
    return jsonify(results)

@app.route('/get/challenge/random', methods = ['GET'])
def getRandomChallenge():
    challengeRes = Challenge.query.order_by(func.random()).first()

    '''testRes = Challenge.query.options(load_only(Challenge.id)).offset(
        (func.floor(
        func.random() * db.session.query(func.count(Challenge.id))
        ))
    ).limit(1).all()
    
    print(testRes)'''

    result = challenge_schema.dump(challengeRes)

    return jsonify(result)

# Add Bigno Card Data
@app.route('/add', methods = ['POST'])
def addData():
    seed = request.json['seed']

    bingos = BingoCard(seed)

    db.session.add(bingos)
    db.session.commit()

    insr = bingo_set_challenges.insert().values(bingocard_id=bingos.id)
    db.session.execute(insr)
    db.session.commit()

    return bingo_schema.jsonify(bingos)

# Add Challenge Data
@app.route('/add/challenge', methods = ['POST'])
def addChallenge():
    challenge = request.json['challenge']
    category = request.json['category']

    challenges = Challenge(challenge, category)

    db.session.add(challenges)
    db.session.commit()

    insr = bingo_set_challenges.insert().values(challenge_id=challenges.id)
    db.session.execute(insr)
    db.session.commit()

    return challenge_schema.jsonify(challenges)

@app.route('/update/<id>', methods = ['PUT'])
def updateCard(id):
    card = BingoCard.query.get(id)

    seed = request.json['seed']

    card.seed = seed

    db.session.commit()
    return bingo_schema.jsonify(card)

@app.route('/update/set_Challenge/<id>', methods = ['PUT'])
def updateChallenge(id):
    cardID = request.json['bingocard_id']

    upd = bingo_set_challenges.update().where(challenge_id=id).values(bingocard_id=cardID)

    db.session.execute(upd)
    db.session.commit()

    return 'Worked'

@app.route('/delete/<id>', methods = ['DELETE'])
def deleteCard(id):
    card = BingoCard.query.get(id)

    db.session.delete(card)
    db.session.commit()

    return bingo_schema.jsonify(card)

if __name__ == '__main__':
    app.run(debug=True)
