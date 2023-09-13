from flask import Blueprint, jsonify, request

from sqlalchemy.sql import func, select, column

from ...extensions import db

from ..models.challenge import Challenge, ChallengeSchema, challenge_schema, challenges_schema
from ..models.bingoSetChallenges import bingo_set_challenges

challenge = Blueprint('challenge', __name__)

@challenge.route('/challenge', methods = ['GET', 'POST'])
def checkMethod1():
    if request.method == 'GET':
        return getAllChallenges()
    else:
        return addChallenge()

def getAllChallenges():
    allChallenges = Challenge.query.all()
    results = challenges_schema.dump(allChallenges)
    return jsonify(results)

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


@challenge.route('/challenge/<id>', methods = ['GET', 'PUT', 'DELETE'])
def checkMethod2(id):
    if request.method == 'GET':
        return getChallengeByID(id)
    elif request.method == 'PUT':
        return updateChallenge(id)
    else:
        return deleteChallenge(id)

def getChallengeByID(id):
    challenge = Challenge.query.get(id)

    return challenge_schema.jsonify(challenge)

def updateChallenge(id):
    challengeQuery = Challenge.query.get(id)

    challenge = request.json['challenge']
    category = request.json['category']

    challengeQuery.challenge = challenge
    challengeQuery.category = category

    db.session.commit()
    return challenge_schema.jsonify(challengeQuery)

def deleteChallenge(id):
    challenge = Challenge.query.get(id)

    db.session.delete(challenge)
    db.session.commit()

    return challenge_schema.jsonify(challenge)

@challenge.route('/challenge/<challengeCategory>', methods = ['GET'])
def getChallengeByCategory(challengeCategory):
    allChallenges = Challenge.query.filter(Challenge.category == challengeCategory).all()
    
    results = challenges_schema.dump(allChallenges)
    return jsonify(results)

@challenge.route('/challenge/random', methods = ['GET'])
def getRandomChallenge():
    challengeResult = Challenge.query.order_by(func.random()).first()
    
    '''
    query = db.session.query(BingoCard)
    rowCount = int(query.count())
    challengeResult = query.offset(int(rowCount*random.random())).first()
    '''
    result = challenge_schema.dump(challengeResult)

    return jsonify(result)

@challenge.route('/challenge/random/<amount>', methods = ['GET'])
def getRandomChallenges(amount):
    challengeResults = Challenge.query.order_by(func.random()).limit(amount)

    result = challenges_schema.dump(challengeResults)

    return jsonify(result)

@challenge.route('/challenge/random/<amount>/<challengeCategory>', methods = ['GET'])
def getRandomChallengesByCategory(amount, challengeCategory):
    challengeResults = Challenge.query.filter(Challenge.category == challengeCategory).order_by(func.random()).limit(amount)

    result = challenges_schema.dump(challengeResults)

    return jsonify(result)
