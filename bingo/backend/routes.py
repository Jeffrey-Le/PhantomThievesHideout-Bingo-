from flask import Blueprint, jsonify, request
from flask_cors import CORS

from .extensions import db, ma

from .models.bingoSetChallenges import bingo_set_challenges
from .models.bingoCard import BingoCard, bingo_schema, bingos_schema
from .models.challenge import Challenge, challenge_schema, challenges_schema

api = Blueprint('api', __name__)

@api.route('/add', methods = ['POST'])
def addData():
    seed = request.json['seed']

    bingos = BingoCard(seed)

    db.session.add(bingos)
    db.session.commit()

    insr = bingo_set_challenges.insert().values(bingocard_id=bingos.id)
    db.session.execute(insr)
    db.session.commit()

    return bingo_schema.jsonify(bingos)