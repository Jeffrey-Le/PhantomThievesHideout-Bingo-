from flask import Blueprint, jsonify, request

from .extensions import db, ma

from .models.bingoSetChallenges import bingo_set_challenges
from .models.bingoCard import BingoCard, bingo_schema, bingos_schema
from .models.challenge import Challenge, challenge_schema, challenges_schema

main = Blueprint('main', __name__)

@main.route('/get/card', methods = ['GET'])
def getAllData():
    allBingoCards = BingoCard.query.all()
    results = bingos_schema.dump(allBingoCards)
    return jsonify(results)

@main.route('/get/challenge', methods = ['GET'])
def getAllChallenges():
    allChallenges = Challenge.query.all()
    results = challenges_schema.dump(allChallenges)
    return jsonify(results)

@main.route('/add', methods = ['POST'])
def addData():
    seed = request.json['seed']

    bingos = BingoCard(seed)

    db.session.add(bingos)
    db.session.commit()

    insr = bingo_set_challenges.insert().values(bingocard_id=bingos.id)
    db.session.execute(insr)
    db.session.commit()

    return bingo_schema.jsonify(bingos)