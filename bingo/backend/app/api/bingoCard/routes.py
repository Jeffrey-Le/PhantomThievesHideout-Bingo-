from flask import Blueprint, jsonify, request

from sqlalchemy.sql import func

from ..models.bingoCard import BingoCard, BingoSchema, bingo_schema, bingos_schema
from ..models.bingoSetChallenges import bingo_set_challenges

from ...extensions import db

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

    '''
    insr = bingo_set_challenges.insert().values(bingocard_id=bingos.id)
    db.session.execute(insr)
    db.session.commit()
    '''

    return bingo_schema.jsonify(bingos)

@bingoCard.route('/card/id=<id>', methods = ['GET', 'PUT', 'DELETE'])
def checkMethod2(id):
    if request.method == 'GET':
        return getCardByID(id)
    elif request.method == 'PUT':
        return updateCardByID(id)
    else:
        return deleteCardByID(id)

def getCardByID(id):
    card = BingoCard.query.get(id)

    return bingo_schema.jsonify(card)

def updateCardByID(id):
    card = BingoCard.query.get(id)

    seed = request.json['seed']

    card.seed = seed

    db.session.commit()
    return bingo_schema.jsonify(card)

def deleteCardByID(id):
    card = BingoCard.query.get(id)

    db.session.delete(card)
    db.session.commit()

    return bingo_schema.jsonify(card)

# CARD BY SEED

@bingoCard.route('/card/seed=<seed>', methods = ['GET', 'PUT', 'DELETE'])
def checkMethod3(seed):
    if request.method == 'GET':
        return getCardBySeed(seed)
    elif request.method == 'PUT':
        return updateCardBySeed(seed)
    else:
        return deleteCardBySeed(seed)

def getCardBySeed(seed):
    card = BingoCard.query.filter(BingoCard.seed == seed).first()

    return bingo_schema.jsonify(card)

def updateCardBySeed(seed):
    card = BingoCard.query.filter(BingoCard.seed == seed).first()

    seedJson = request.json['seed']

    card.seed = seedJson

    db.session.commit()
    return bingo_schema.jsonify(card)

def deleteCardBySeed(seed):
    card = BingoCard.query.filter(BingoCard.seed == seed).first()

    db.session.delete(card)
    db.session.commit()

    return bingo_schema.jsonify(card)

@bingoCard.route('/card/random/<amount>', methods = ['GET'])
def getRandomCard(amount):
    cardResults = BingoCard.query.order_by(func.random()).limit(amount)

    result = bingos_schema.dump(cardResults)

    return jsonify(result)
