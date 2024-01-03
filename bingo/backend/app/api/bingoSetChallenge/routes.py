from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text, func

from ...extensions import db, ma

from ..models.bingoSetChallenges import bingo_set_challenges
from ..models.challenge import Challenge, challenge_schema, challenges_schema


bingoSetChallenges = Blueprint('bingo_set_challenges', __name__)

@bingoSetChallenges.route('/challenge/set/id=<id>', methods = ['GET', 'PUT'])
def checkMethod(id):
    if request.method == 'GET':
        return getChallengesInSet(id)
    else:
        return updateChallenge(id)

def getChallengesInSet(id):
    challenges = Challenge.query.join(bingo_set_challenges).filter(bingo_set_challenges.c.challenge_id==Challenge.id).where(bingo_set_challenges.c.bingocard_id==id).order_by(bingo_set_challenges.c.position).all()

    result = challenges_schema.dump(challenges)

    return jsonify(result)

def updateChallenge(id):
    cardID = request.json['bingocard_id']
    position = request.json['position']

    upd = bingo_set_challenges.update().where(bingo_set_challenges.c.challenge_id==id).values(bingocard_id=cardID, position=position)

    db.session.execute(upd)
    db.session.commit()

    return 'Worked'

@bingoSetChallenges.route('/challenge/set/amount=<amount>', methods = ['GET'])
def getRandomNumChallengesInSet(amount):
    challengeResults = Challenge.query.join(bingo_set_challenges).filter(bingo_set_challenges.c.challenge_id==Challenge.id).\
    where(bingo_set_challenges.c.bingocard_id==None).order_by(func.random()).limit(amount)

    result = challenges_schema.dump(challengeResults)

    return jsonify(result)
