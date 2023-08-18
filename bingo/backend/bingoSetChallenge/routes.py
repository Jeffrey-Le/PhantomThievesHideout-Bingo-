from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text

from ..extensions import db

from ..models.bingoSetChallenges import bingo_set_challenges

bingoSetChallenges = Blueprint('bingo_set_challenges', __name__)

@bingoSetChallenges.route('/challenge/<id>', methods = ['PUT'])
def updateChallenge(id):
    cardID = request.json['bingocard_id']

    upd = bingo_set_challenges.update().where(bingo_set_challenges.c.challenge_id==id).values(bingocard_id=cardID)

    db.session.execute(upd)
    db.session.commit()

    return 'Worked'