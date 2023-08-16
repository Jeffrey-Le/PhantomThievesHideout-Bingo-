from flask import Blueprint, jsonify

from .extensions import db, ma

from .models import BingoCard, bingos_schema, Challenge, challenges_schema

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