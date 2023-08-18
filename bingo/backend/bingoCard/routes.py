from flask import Blueprint, jsonify, request

from ..models.bingoCard import BingoCard, BingoSchema, bingo_schema, bingos_schema
from ..models.bingoSetChallenges import bingo_set_challenges

from ..extensions import db

bingoCard = Blueprint('bingoCard', __name__)

@bingoCard.route('/card', methods = ['GET', 'POST'])
def checkMethod1():
    if request.method == 'GET':
        return getAllCards()
    else:
        return addCard()

def getAllCards():
    allBingoCards = BingoCard.query.all()
    results = bingos_schema.dump(allBingoCards)

    return jsonify(results)
        

def addCard():
    seed = request.json['seed']

    bingos = BingoCard(seed)

    db.session.add(bingos)
    db.session.commit()

    insr = bingo_set_challenges.insert().values(bingocard_id=bingos.id)
    db.session.execute(insr)
    db.session.commit()

    return bingo_schema.jsonify(bingos)

@bingoCard.route('/card/<id>', methods = ['GET', 'PUT', 'DELETE'])
def checkMethod2(id):
    if request.method == 'GET':
        return getCard(id)
    elif request.method == 'PUT':
        return updateCard(id)
    else:
        return deleteCard(id)

def getCard(id):
    card = BingoCard.query.get(id)

    return bingo_schema.jsonify(card)

def updateCard(id):
    card = BingoCard.query.get(id)

    seed = request.json['seed']

    card.seed = seed

    db.session.commit()
    return bingo_schema.jsonify(card)

def deleteCard(id):
    card = BingoCard.query.get(id)

    db.session.delete(card)
    db.session.commit()

    return bingo_schema.jsonify(card)